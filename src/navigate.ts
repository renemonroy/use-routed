/**
 * Simulates navigation by updating popstate from a given URL
 * @param {string} pathname - Path to navigate to
 */
export default function navigate(pathname: string): void {
  // const url = pathname.split("?")[0];
  if (window.location.pathname === pathname) return;
  window.history.pushState(null, "", pathname);

  // TODO: use something else instead dispatching the popstate event manually
  const popStateEvent = new PopStateEvent("popstate", {
    bubbles: false,
    cancelable: false,
    state: null
  });

  window.dispatchEvent(popStateEvent);
}
