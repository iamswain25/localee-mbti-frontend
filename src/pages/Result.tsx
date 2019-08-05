import React from "react";
import useGlobal from "../store/useGlobal";
import { RouteProps } from "react-router-dom";
export default (props: RouteProps) => {
  const [{ profile } /* globalActions */] = useGlobal("profile");
  console.log(profile);
  return (
    <div>
      {Object.entries(profile).map(([key, value], i) => (
        <div key={i}>
          {String(key)}: {String(value)}
        </div>
      ))}
    </div>
  );
};
