import React from "react";
import { Card, StyledBody, StyledContents } from "baseui/card";
import BarGraph from "../components/BarGraph";
import { useAtom } from "jotai";
import { resultAtom } from "../store/jotai";
export default function Result() {
  const [r] = useAtom(resultAtom);
  return (
    <div style={{ marginTop: "1rem" }}>
      <Card headerImage={r?.profile?.link} title={"🧩 " + r?.profile?.name}>
        {Boolean(r?.total?.counter) && (
          <div>
            <StyledBody>
              {r?.total?.counter}명이 분석한 {r?.profile?.name}의 MBTI는{" "}
              {r?.total?.mbti} 입니다.
            </StyledBody>
            <StyledContents>
              {r?.total?.detail && <BarGraph detail={r.total.detail} />}
            </StyledContents>
          </div>
        )}
        <StyledBody>
          내가 평가한 {r?.profile?.name}의 MBTI는 {r?.mine?.mbti} 입니다. (* 8개
          질문 밖에 되지 않아 정확도가 낮습니다.)
        </StyledBody>
        <StyledContents>
          {r?.mine?.detail && <BarGraph detail={r.mine.detail} />}
        </StyledContents>
      </Card>
    </div>
  );
}
