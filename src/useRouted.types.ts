import React from "react";

interface IDynamic {
  [key: string]: any;
}

export interface IRoutes {
  [pathname: string]: React.ElementType<any>;
}

export interface IRoute {
  Component: React.ElementType<any>;
  path: undefined | RegExp;
  props: {} | IDynamic;
  query: {} | IDynamic;
}

export interface IRouteConfig {
  Component: React.ElementType<any>;
  keys: string[];
  path: RegExp;
}
