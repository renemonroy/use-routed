import { IRoutes, IRoute, IRouteConfig } from "./useRouted";
const loc = window.location;

/**
 * Produces a route Object depending the current pathname
 * ----------------------------------------------------------------------------
 * @param {Object} routes - Config object indicating available routes
 * @returns {Object} - Represents a route with props and queries if found
 */
export default function getRoute(routes: IRoutes): IRoute {
  return Object.keys(routes)
    .sort((a: string, b: string) => b.length - a.length)
    .map((path: string) => {
      const paramsRegex = /:[^\s/]+/g;
      return {
        Component: routes[path],
        keys: (path.match(paramsRegex) || []).map((param: string) =>
          param.replace(":", "")
        ),
        path: new RegExp("^" + path.replace(paramsRegex, "([\\w-]+)") + "$")
      };
    })
    .reduce(
      (acc: IRoute, curr: IRouteConfig) => {
        const values = loc.pathname.match(curr.path) || [];
        if (values.length <= 0) return acc; // TODO: break once first value route is found
        const params = values.slice(1);
        const { keys, ...rest } = curr;
        const searchParams = new URL(loc.href).searchParams;
        let query = {};
        if (searchParams) {
          const searchEntries = searchParams.entries();
          for (let pair of searchEntries) {
            query[pair[0]] = Number(pair[1]) || pair[1];
          }
        }
        return {
          ...rest,
          props: Object.assign(
            {},
            ...keys.map((k, i) => ({ [k]: params[i] })) // NOTE: maybe not assume keys/values have same size?
          ),
          query
        };
      },
      { Component: () => null, path: undefined, props: {}, query: {} }
    );
}
