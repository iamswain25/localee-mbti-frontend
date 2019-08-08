import React from "react";
import useGlobal from "../store/useGlobal";
import { RouteProps } from "react-router-dom";
export default (props: RouteProps) => {
  const [{ result }, actions] = useGlobal(["result"]);
  function resetResult() {
    actions.emptyResult();
  }
  return (
    <div>
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
        </div>
      ))}
    </div>
  );
};
