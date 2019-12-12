import React from "react";
import { navigate } from "use-routed";

import "./Home.css";

export default function Home() {
  const [username, setUsername] = React.useState("");
  return (
    <div className="homepage">
      <h2>Public Gists Previewer</h2>
      <p>What's your Github username?</p>
      <input type="text" onChange={e => setUsername(e.target.value)} />
      <button onClick={() => username && navigate(`/${username}`)}>Ok</button>
    </div>
  );
}
