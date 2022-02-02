import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { functions, storage } from "../firebase";
import { Question, Answer } from "../@types/Answer";
import { ProgressBar } from "baseui/progress-bar";
import { Card, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import firebase, { firestore } from "../firebase";
import { useAtom } from "jotai";
import { loadingAtom, resultAtom } from "../store/jotai";
const questions20 = functions.httpsCallable("questionsCall");
const answersCall = functions.httpsCallable("answersCall");
let answersDocId = "null"; //여기서 시작, 정답 넣을 때 마다 firestore에 올리기
export default function MbtiTest8() {
  const navigate = useNavigate();
  const answersMemo = React.useMemo<Answer[]>(() => [], []);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [, setResult] = useAtom(resultAtom);
  const { id } = useParams();
  const [q, setQ] = useState<Question[]>([]);
  const [progress, setProgress] = React.useState(0);
  const [link, setLink] = React.useState("");
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    firestore
      .collection("profile")
      .doc(id)
      .get()
      .then((res) => res.get("link") as string | undefined)
      .then((link) => {
        if (link) {
          setLink(link);
          return questions20({ name: id, link });
        } else {
          return storage
            .ref("profile")
            .child(id)
            .getDownloadURL()
            .then((link) => {
              setLink(link);
              return questions20({ name: id, link });
            });
        }
      })
      .then((r) => {
        setQ(r.data.questions);
        answersDocId = r.data.answersDocId;
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [id]);
  function answerClickHandler(checkedIndex: number) {
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
        Object.keys(now).forEach((k) => {
          if (typeof pre[k] === "number") {
            pre[k] += now[k];
          } else {
            pre[k] = now[k];
          }
        });
        return pre;
      }, {});
    scores.id = id;
    scores.docId = answersDocId;
    console.log(scores);
    answersCall(scores)
      .then((res) => res.data)
      .then((res) => setResult({ profile: { name: id, link }, ...res }))
      .then(() => navigate("/result"));
  }
  if (loading) return null;
  if (q.length === progress) {
    return (
      <div>
        "축하합니다! 결과를 계산 중입니다. 잠시만 기다리면 다른 사람도 참가한
        전체 통계를 확인할 수 있습니다." 🎉
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
                  right: "10px",
                },
              };
            },
          },
          Bar: {
            style: ({ $theme }) => ({
              height: $theme.sizing.scale800,
            }),
          },
        }}
      />
      <Card
        overrides={{
          HeaderImage: {
            style: ({ $theme }) => ({
              display: "block",
              margin: "auto",
            }),
          },
        }}
        headerImage={link}
        title={question}
      >
        <StyledAction
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
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
                        marginRight: $theme.sizing.scale200,
                      };
                    },
                  },
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
}
