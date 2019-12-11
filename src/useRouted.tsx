import React from "react";

import { IRoutes, IRoute } from "./useRouted.types";
import getRoute from "./getRoute";

const opts = { "/": () => null };

/**
 * React Hook used to render components based on routes.
 * ----------------------------------------------------------------------------
 * @param {Object} routes - Config object indicating available routes
 * @returns {React.ElementType} - Component that represents the current route
 */
export default function useRouted(routes: IRoutes = opts) {
  const initialRoute: IRoute = getRoute(routes);
  const [route, setRoute] = React.useState<IRoute>(initialRoute);

  React.useEffect(() => {
    function handlePopstate(e: PopStateEvent) {
      e.preventDefault();
      e.stopPropagation();
      const newRoute: IRoute = getRoute(routes);
      setRoute(newRoute);
      document.body.scroll(0, 0); // NOTE: remove and/or include 'html'?
    }
    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []); // eslint-disable-line

  return (
    <route.Component {...route.props} key={route.path} query={route.query} />
  );
}
