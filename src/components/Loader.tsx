import React from "react";
import { RouteProps } from "react-router-dom";

// import CircularProgress from "@material-ui/core/CircularProgress";
import UseSpinner from "./UseSpinner";
export default (props: RouteProps) => {
  const [spinner] = UseSpinner(true);
  return spinner;
  // <div
  //   style={{
  //     // width: "100wh",
  //     // flex: 1,
  //     // height: "20px",
  //     height: "80vh",
  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     backgroundColor: "#FFF000AA"
  //     // padding: 300
  //   }}
  // >
  //   <CircularProgress size={100} />
  // </div>
  // );
};
