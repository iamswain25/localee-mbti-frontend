import React from "react";
import { MBTIKey, MBTI_result } from "../@types/Answer";
export default function BarGraph(props: { detail: MBTI_result }) {
  function displayKeyIfExist(key: MBTIKey) {
    return props.detail[key] ? key : "";
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        fontSize: "2rem",
        lineHeight: "2.1rem",
      }}
    >
      <div style={{ width: 50, overflow: "hidden" }}>
        <div style={{ height: props.detail.E, backgroundColor: "#EFD2CB" }}>
          {displayKeyIfExist("E")}
        </div>
        <div style={{ height: props.detail.I, backgroundColor: "cyan" }}>
          {displayKeyIfExist("I")}
        </div>
      </div>
      <div style={{ width: 50, overflow: "hidden" }}>
        <div
          style={{
            height: props.detail.S,
            backgroundColor: "#FF3C38",
            color: "white",
          }}
        >
          {displayKeyIfExist("S")}
        </div>
        <div style={{ height: props.detail.N, backgroundColor: "#00FF00" }}>
          {displayKeyIfExist("N")}
        </div>
      </div>
      <div style={{ width: 50, overflow: "hidden" }}>
        <div style={{ height: props.detail.T, backgroundColor: "#FF9900" }}>
          {displayKeyIfExist("T")}
        </div>
        <div style={{ height: props.detail.F, backgroundColor: "#CCD7C5" }}>
          {displayKeyIfExist("F")}
        </div>
      </div>
      <div style={{ width: 50, overflow: "hidden" }}>
        <div style={{ height: props.detail.J, backgroundColor: "lightblue" }}>
          {displayKeyIfExist("J")}
        </div>
        <div style={{ height: props.detail.P, backgroundColor: "yellow" }}>
          {displayKeyIfExist("P")}
        </div>
      </div>
    </div>
  );
}
