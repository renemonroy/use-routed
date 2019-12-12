import React from "react";

// Gists constants
const FETCH_USER_GISTS_STARTED = "FETCH_USER_GISTS_STARTED";
const FETCH_USER_GISTS_SUCCEED = "FETCH_USER_GISTS_SUCCEED";
const FETCH_USER_GISTS_FAILED = "FETCH_USER_GISTS_FAILED";

// Gists initial state
const gistsInitialState = {
  userGists: [],
  userGistsError: null,
  isFetchingUserGists: false
};

// Gists context
const gistsContext = React.createContext(null);

// Gists reducer
function gistsReducer(state, actions) {
  switch (actions.type) {
    case FETCH_USER_GISTS_STARTED:
      return { ...state, isFetchingUserGists: true };
    case FETCH_USER_GISTS_SUCCEED:
      return {
        ...state,
        isFetchingUserGists: false,
        userGists: actions.userGists
      };
    case FETCH_USER_GISTS_FAILED:
      return {
        ...state,
        isFetchingUserGists: false,
        userGistsError: actions.userGistsError
      };
    default:
      return state;
  }
}

// Gists provider
export function GistsProvider({ children }) {
  const [state, dispatch] = React.useReducer(gistsReducer, gistsInitialState);
  return (
    <gistsContext.Provider value={{ state, dispatch }}>
      {children}
    </gistsContext.Provider>
  );
}

// Gists hook (instead consumer)
export function useGists() {
  const { state, dispatch } = React.useContext(gistsContext);

  async function fetchUserGists(user) {
    try {
      dispatch({ type: FETCH_USER_GISTS_STARTED });
      const res = await fetch(`https://api.github.com/users/${user}/gists`);
      if (res.status === 404) {
        dispatch({
          type: FETCH_USER_GISTS_FAILED,
          userGistsError: "User Not Found"
        });
        return;
      }
      const userGists = await res.json();
      dispatch({ type: FETCH_USER_GISTS_SUCCEED, userGists });
    } catch (e) {
      console.log(e);
    }
  }

  return [state, { fetchUserGists }];
}
