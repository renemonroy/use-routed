import React from "react";
import navigate from "./navigate";

export type AnchorProps = JSX.IntrinsicElements["a"];

/**
 * Navigates by using pushState while preventing default anchor's behavior
 * ----------------------------------------------------------------------------
 * @param {Object} props - Same properties as an Anchor element
 * @returns {React.ElementType} - A regular link with History Api behavior
 */
export default function Link(props: AnchorProps): JSX.Element {
  const { children, ...rest } = props;
  return (
    <a
      {...rest}
      onClick={e => {
        e.preventDefault();
        if (!rest.href) throw Error("Link requires href");
        navigate(rest.href);
      }}
    >
      {children}
    </a>
  );
}
