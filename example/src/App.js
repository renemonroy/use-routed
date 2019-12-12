import React from "react";
import useRouted from "use-routed";

import { GistsProvider } from "./utils/GistsStore";
import Home from "./pages/Home";
import User from "./pages/User";
import NotFound from "./pages/NotFound";

const routes = {
  "/": Home,
  "/404": NotFound,
  "/:username": User
};

export default function App() {
  const routedComponent = useRouted(routes);
  return (
    <div className="App">
      <GistsProvider>{routedComponent}</GistsProvider>
    </div>
  );
}
