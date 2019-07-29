import React, { useEffect, useState } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import useGlobal from "../store/useGlobal";
import { functions } from "../firebase";
import { Question, Answer } from "../@types/Answer";
import { Checkbox } from "@material-ui/core";
const questions20 = functions.httpsCallable("questionsCall");
export default (props: RouteComponentProps) => {
  const [globalState, globalActions] = useGlobal();
  const { profile } = globalState;
  const [q, setQ] = useState<Question[]>([]);
  useEffect(() => {
    globalActions.setLoading(true);
    questions20()
      .then(r => r.data)
      .then(r => setQ(r))
      .finally(globalActions.loadingIndicatorOff);
  }, [globalActions, globalActions.setLoading]);
  function radioChangeHandler(index: Number, checkedIndex: Number) {
    console.log(index, checkedIndex);
    const qe = q.find(a => a.index === index);
    if (qe) {
      qe.checked = true;
      qe.answers.forEach((a, i) => {
        a.checked = i === checkedIndex;
      });
    }
    setQ([...q]);
    // console.log(index, qe, q);
  }
  function submit() {
    const isComplete = q.every(qe => qe.checked);
    if (isComplete) {
      // if (!q.some(qe => qe.answers.some(a => a.checked))) {
      //   return;
      // }
      const answersArr: Answer[] = q.map(
        qe => qe.answers.find(a => a.checked) as Answer
      );
      const scores: Answer = answersArr
        .map(({ a, checked, ...score }) => score)
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
      console.log(scores);
      // scores.id = props.id;
      // props.answerQ(scores);
    } else {
      alert("8개 문항을 모두 체크하셔야 합니다.");
    }
  }
  return (
    <div style={{ padding: 5 }}>
      <Link to="/result">a</Link>
      <h1 style={{ textAlign: "center" }}>{profile.name} 성격은 어떤가요?</h1>
      <div>
        {q.map((e, i) => {
          const { answers, question, index, checked } = e;
          return (
            <div key={i} style={{ marginTop: 20, opacity: checked ? 0.5 : 1 }}>
              <h2>
                {i + 1}
                {question && `: ${question}`}
              </h2>
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "space-between"
                }}
              >
                {answers.map((answer, i) => {
                  const { a, checked, ...rest } = answer;
                  const name = JSON.stringify(rest);
                  return (
                    <button
                      onClick={radioChangeHandler.bind(null, index, i)}
                      key={i}
                      style={{
                        // display: "flex",
                        // flexDirection: "row",
                        flex: 1,
                        backgroundColor: checked ? "#50C878" : "",
                        marginLeft: 5,
                        marginRight: 5,
                        borderWidth: 2,
                        borderRadius: 5,
                        padding: 5
                        // alignItems: "center"
                      }}
                    >
                      <Checkbox checked={checked || false} disabled />
                      <div style={{ marginLeft: 5, fontSize: 16 }}>{a}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
        <button
          onClick={submit}
          style={{
            borderWidth: 3,
            borderRadius: 10
          }}
        >
          <div style={{ fontSize: 20, textAlign: "center", padding: 10 }}>
            확인 및 비교
          </div>
        </button>
      </div>
    </div>
  );
};
