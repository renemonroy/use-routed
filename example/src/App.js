import React from "react";
import useRouted, { Link, navigate } from "use-routed";

function Home() {
  const [username, setUsername] = React.useState("");
  return (
    <section>
      <p>What's your name?</p>
      <input type="text" onChange={e => setUsername(e.target.value)} />
      <button onClick={() => username && navigate(`/${username}`)}>Ok</button>
    </section>
  );
}

function User({ username }) {
  return (
    <section>
      <p>Hi {username}!</p>
      <Link href="/">Return</Link>
    </section>
  );
}

const routes = {
  "/": Home,
  "/:username": User
};

export default function App() {
  const example = useRouted(routes);
  return <div className="app">{example}</div>;
}
