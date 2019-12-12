import React from "react";
import { Link, navigate, paginate } from "use-routed";

import { useGists } from "../utils/GistsStore";
import formatDate from "../utils/formatDate";
import "./User.css";

export default function User({
  username,
  query: { page = 1, gistsPerPage = 10 }
}) {
  // Use a custom Gists store
  const [gistsState, gistsActions] = useGists();

  // Get gists when component mounts
  React.useEffect(() => {
    gistsActions.fetchUserGists(username);
  }, []); // eslint-disable-line

  // Redirect when user doesn't exist
  React.useEffect(() => {
    console.log("error:", gistsState.userGistsError);
    if (gistsState.userGistsError === "User Not Found") navigate("/404");
  }, [gistsState.userGistsError]);

  // Paginate fetched gists
  const { currentItems, numOfPages } = React.useMemo(
    () => paginate(gistsState.userGists, page, gistsPerPage),
    [gistsState.userGists, page, gistsPerPage]
  );

  // Navigate to prev/next page
  function goToGistsPage(n) {
    navigate(`/${username}?page=${n}&gistsPerPage=${gistsPerPage}`);
  }

  return gistsState.isFetchingUserGists ||
    page > numOfPages ||
    page < 0 ? null : currentItems.length <= 0 ? (
    <div className="profile">
      <p>
        Looks like <strong>{username}</strong> doesn’t have any public gists
        yet.
        <br />
        <Link href="/">Go home</Link>
      </p>
    </div>
  ) : (
    <div className="user-page">
      <div className="profile">
        <img src={`${currentItems[0].owner.avatar_url}`} alt={username} />
        <h3>{username}</h3>
      </div>
      <div className="gists-list">
        {currentItems.map(({ created_at, description, files, id, owner }) => {
          const filesKeys = Object.keys(files);
          const filesSize = filesKeys.length;
          return (
            <div key={id} className="gist">
              <div className="gist-header">
                <div className="gist-header-left">
                  <span>{owner.login}</span> / <strong>{filesKeys[0]}</strong>
                </div>
                <div className="gist-header-right ">
                  <span className="gist-meta" role="img" aria-label="file">
                    📄{filesSize} {filesSize === 1 ? "file" : "files"}
                  </span>
                </div>
              </div>
              <div className="gist-item-body">
                <span className="gist-date">
                  Created at {formatDate(created_at)}
                </span>
                {description && (
                  <p className="gist-description">{description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="gists-navigation cols center">
        <button disabled={page <= 1} onClick={() => goToGistsPage(page - 1)}>
          Newer
        </button>
        <button
          disabled={page >= numOfPages}
          onClick={() => goToGistsPage(page + 1)}
        >
          Older
        </button>
      </div>
    </div>
  );
}
