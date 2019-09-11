import React from "react";
import { Card, StyledBody, StyledContents } from "baseui/card";
import usePersist from "../store/usePersist";
import { RouteProps } from "react-router-dom";
// import { Block } from "baseui/block";
import BarGraph from "../components/BarGraph";
import { Result } from "../@types/Result";
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
      {result.map((r: Result, i: number) => (
        // <div
        //   key={i}
        //   style={{
        //     borderColor: "blue",
        //     borderWidth: 1,
        //     margin: 5,
        //     borderStyle: "solid"
        //   }}
        // >
        //   {Object.entries(r).map(([key, value], i) => (
        //     <div key={i}>
        //       {String(key)}: {JSON.stringify(value)}
        //     </div>
        //   ))}
        <Card headerImage={r.profile.link} title={r.profile.name} key={i}>
          <StyledBody>
            Total({r.total.counter}): {r.total.mbti}
          </StyledBody>
          <StyledContents>
            <BarGraph detail={r.total.detail} />
          </StyledContents>
          <StyledBody>Mine: {r.mine.mbti}</StyledBody>
          <StyledContents>
            <BarGraph detail={r.mine.detail} />
          </StyledContents>
        </Card>
        // </div>
      ))}
    </div>
  );
};
