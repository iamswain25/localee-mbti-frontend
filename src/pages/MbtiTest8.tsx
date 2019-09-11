import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import useGlobal from "../store/useGlobal";
import usePersist from "../store/usePersist";
import { functions } from "../firebase";
import { Question, Answer } from "../@types/Answer";
import { ProgressBar } from "baseui/progress-bar";
import { Card, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import firebase, { firestore } from "../firebase";
const questions20 = functions.httpsCallable("questionsCall");
const answersCall = functions.httpsCallable("answersCall");
let answersDocId = "null"; //여기서 시작, 정답 넣을 때 마다 firestore에 올리기
export default (props: RouteComponentProps) => {
  const answersMemo = React.useMemo<Answer[]>(() => [], []);
  const persistActions = usePersist()[1];
  const [{ profile, loading }, globalActions] = useGlobal();
  const [q, setQ] = useState<Question[]>([]);
  const [progress, setProgress] = React.useState(0);
  useEffect(() => {
    globalActions.setLoading(true);
    const { search } = props.location;
    if (!search.length) {
      alert("no person's name");
      props.history.goBack();
      return;
    }
    const params = new URLSearchParams(search);
    const name = params.get("name");
    const link = params.get("link");
    globalActions.setProfile({ name, link });
    questions20({ name, link })
      .then(r => {
        setQ(r.data.questions);
        answersDocId = r.data.answersDocId;
      })
      .finally(globalActions.loadingIndicatorOff);
  }, [
    globalActions,
    globalActions.setLoading,
    props.history,
    props.location,
    props.location.search
  ]);
  function answerClickHandler(checkedIndex: number) {
    // console.log(progress, checkedIndex);
    const qe = q[progress].answers[checkedIndex];
    answersMemo.push(qe);
    console.log(qe);
    firestore
      .collection("answers")
      .doc(answersDocId)
      .update({ answers: firebase.firestore.FieldValue.arrayUnion(qe) });
    setProgress(progress + 1);
    if (progress + 1 === q.length) {
      submit();
    }
  }
  function submit() {
    const scores: Answer = answersMemo
      .map(({ a, ...score }) => score)
      .reduce((pre, now) => {
        Object.keys(now).forEach(k => {
          if (typeof pre[k] === "number") {
            pre[k] += now[k];
          } else {
            pre[k] = now[k];
          }
        });
        return pre;
      }, {});
    scores.id = profile.name;
    scores.docId = answersDocId;
    console.log(scores);
    answersCall(scores)
      .then(res => res.data)
      .then(res => persistActions.setResult({ profile, ...res }))
      .then(() => props.history.push("/result"));
  }
  if (loading) {
    return null;
  }
  if (q.length === progress) {
    return (
      <div>
        "축하합니다! 결과를 계산 중입니다. 잠시만 기다리면 다른 사람도 참가한
        전체 통계를 확인할 수 있습니다." (confetti 애니메이션)
      </div>
    );
  }
  const { answers, question } = q[progress];
  return (
    <div /* style={{ padding: 5 }} */>
      <ProgressBar
        value={progress}
        successValue={q.length}
        overrides={{
          BarProgress: {
            style: ({ $theme, $value }) => {
              return {
                ...$theme.typography.font450,
                backgroundColor: $theme.colors.positive,
                color: $theme.colors.mono200,
                position: "relative",
                ":after": {
                  position: "absolute",
                  content: $value > 0 ? `"${$value}"` : "",
                  right: "10px"
                }
              };
            }
          },
          Bar: {
            style: ({ $theme }) => ({
              height: $theme.sizing.scale800
            })
          }
        }}
      />
      <Card
        overrides={{
          HeaderImage: {
            style: ({ $theme }) => ({
              display: "block",
              margin: "auto"
            })
          }
        }}
        headerImage={profile.link}
        title={question}
      >
        <StyledAction
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap"
          }}
        >
          {answers.map((answer, i) => {
            const { a } = answer;
            return (
              <Button
                key={i}
                onClick={answerClickHandler.bind(null, i)}
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => {
                      return {
                        marginTop: $theme.sizing.scale200,
                        marginBottom: $theme.sizing.scale200,
                        marginLeft: $theme.sizing.scale200,
                        marginRight: $theme.sizing.scale200
                      };
                    }
                  }
                }}
              >
                {a}
              </Button>
            );
          })}
        </StyledAction>
      </Card>
    </div>
  );
};
