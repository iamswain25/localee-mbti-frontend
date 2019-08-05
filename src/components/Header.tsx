import React from "react";
import useGlobal from "../store/useGlobal";
import { RouteProps, NavLink } from "react-router-dom";
export default (props: RouteProps) => {
  const [profile] = useGlobal("profile");
  return (
    <div>
      <NavLink to="/" style={{ marginLeft: 10 }}>
        Home
      </NavLink>
      <NavLink to="test" style={{ marginLeft: 10 }}>
        {profile.myResult ? "test again" : "test"}
      </NavLink>
      {profile.myResult && (
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
