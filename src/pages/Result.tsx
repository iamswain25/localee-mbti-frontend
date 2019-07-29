import React from "react";
import useGlobal from "../store/useGlobal";
import { Link } from "react-router-dom";
export default (props: {}) => {
  const [profile, globalActions] = useGlobal("profile");
  console.log(profile);
  return (
    <div>
      a<Link to="/">gogogogo</Link>
    </div>
  );
};
