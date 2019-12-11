import React from "react";
import { useRouted } from "use-routed";

const Home = () => <p>Welcome!</p>;
const NotFound = () => <p>404</p>;
const User = ({ username }) => <p>Hi {username}!</p>;

const routes = {
  "/": Home,
  "/404": NotFound,
  "/:username": User
};

export default function App() {
  const example = useRouted(routes);
  return <div className="app">{example}</div>;
}
