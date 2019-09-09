import React from "react";
import useGlobal from "../store/useGlobal";
import { RouteProps, NavLink } from "react-router-dom";
export default (props: RouteProps) => {
  const [{ result }] = useGlobal("result");
  return (
    <div>
      <NavLink to="/" style={{ marginLeft: 10 }}>
        Home
      </NavLink>
      {result && result.length > 0 && (
        <NavLink to="result" style={{ marginLeft: 10 }}>
          Result
        </NavLink>
      )}
      <NavLink to="upload" style={{ marginRight: 10, float: "right" }}>
        upload
      </NavLink>
    </div>
  );
};
