import React from "react";
import usePersist from "../store/usePersist";
import { RouteProps } from "react-router-dom";
export default (props: RouteProps) => {
  const [{ result }, actions] = usePersist(["result"]);
  function resetResult() {
    actions.emptyResult();
  }
  return (
    <div>
      {result && result.length && (
        <div>
          총 {result.length}번 의 테스트에 참가하셨습니다. 결과는 브라우저에만
          저장되어 있습니다. 로그인 하여 계정에 결과를 저장하시면 더 많은
          서비스가 제공됩니다.
        </div>
      )}
      <button onClick={resetResult}>reset</button>
      {result.map((r: any, i: number) => (
        <div
          key={i}
          style={{
            borderColor: "blue",
            borderWidth: 1,
            margin: 5,
            borderStyle: "solid"
          }}
        >
          {Object.entries(r).map(([key, value], i) => (
            <div key={i}>
              {String(key)}: {JSON.stringify(value)}
            </div>
          ))}
          <span>total</span>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: 50, overflow: "hidden" }}>
              <div style={{ height: r.total.detail.E, backgroundColor: "red" }}>
                E
              </div>
              <div
                style={{ height: r.total.detail.I, backgroundColor: "cyan" }}
              >
                I
              </div>
            </div>
            <div style={{ width: 50, overflow: "hidden" }}>
              <div
                style={{ height: r.total.detail.J, backgroundColor: "blue" }}
              >
                J
              </div>
              <div
                style={{ height: r.total.detail.P, backgroundColor: "yellow" }}
              >
                P
              </div>
            </div>
            <div style={{ width: 50, overflow: "hidden" }}>
              <div
                style={{ height: r.total.detail.S, backgroundColor: "#FF00FF" }}
              >
                S
              </div>
              <div
                style={{ height: r.total.detail.N, backgroundColor: "#00FF00" }}
              >
                N
              </div>
            </div>
            <div style={{ width: 50, overflow: "hidden" }}>
              <div
                style={{ height: r.total.detail.T, backgroundColor: "#FF9900" }}
              >
                T
              </div>
              <div
                style={{ height: r.total.detail.F, backgroundColor: "#0066FF" }}
              >
                F
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
