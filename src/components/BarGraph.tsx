import React from "react";
// import { RouteProps } from "react-router-dom";
import { MBTIKey, MBTI_result } from "../@types/Answer";
export default (props: { detail: MBTI_result }) => {
  function displayKeyIfExist(key: MBTIKey) {
    return props.detail[key] ? key : "";
  }
  //   console.log(props.detail);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: 50, overflow: "hidden" }}>
        <div style={{ height: props.detail.E, backgroundColor: "red" }}>
          {displayKeyIfExist("E")}
        </div>
        <div style={{ height: props.detail.I, backgroundColor: "cyan" }}>
          {displayKeyIfExist("I")}
        </div>
      </div>
      <div style={{ width: 50, overflow: "hidden" }}>
        <div style={{ height: props.detail.S, backgroundColor: "#FF00FF" }}>
          {displayKeyIfExist("S")}
        </div>
        <div style={{ height: props.detail.N, backgroundColor: "#00FF00" }}>
          {displayKeyIfExist("N")}
        </div>
      </div>
      <div style={{ width: 50, overflow: "hidden" }}>
        <div style={{ height: props.detail.J, backgroundColor: "blue" }}>
          {displayKeyIfExist("J")}
        </div>
        <div style={{ height: props.detail.P, backgroundColor: "yellow" }}>
          {displayKeyIfExist("P")}
        </div>
      </div>
      <div style={{ width: 50, overflow: "hidden" }}>
        <div style={{ height: props.detail.T, backgroundColor: "#FF9900" }}>
          {displayKeyIfExist("T")}
        </div>
        <div style={{ height: props.detail.F, backgroundColor: "#0066FF" }}>
          {displayKeyIfExist("F")}
        </div>
      </div>
    </div>
  );
};
