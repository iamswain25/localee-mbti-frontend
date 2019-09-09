import React from "react";
import { RouteProps } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
export default (props: RouteProps) => {
  return (
    <div
      style={{
        // width: "100wh",
        // flex: 1,
        // height: "20px",
        // height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 300
      }}
    >
      <CircularProgress size={100} />
    </div>
  );
};
