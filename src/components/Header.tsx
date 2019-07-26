import React from "react";
import { RouteProps, NavLink } from "react-router-dom";
export default (props: RouteProps) => {
  return (
    <div>
      <NavLink to="test">Test</NavLink>
    </div>
  );
};
