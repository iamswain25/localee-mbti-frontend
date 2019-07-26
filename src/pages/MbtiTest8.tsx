import React, { useEffect, useState, ChangeEvent, SyntheticEvent } from "react";
import { functions } from "../firebase";
import { Question } from "../@types/Answer";
const Example: Question[] = [
  {
    index: 11,
    question: "나는 평소에",
    answers: [
      {
        "T(M)": 2,
        a: "감상 (Sentiment) 보다는 논리를 더 중요시하는 편이다.",
        "T(F)": 2
      },
      {
        "F(M)": 2,
        a: "논리보다는 감상 (Sentiment) 를 더 중요시하는 편이다.",
        "F(F)": 2
      }
    ]
  },
  {
    question:
      "주말에 마쳐야 되는 일의 목록을 작성해야 한다는 생각은 그에게 있어서 ,",
    answers: [
      { J: 1, a: "호감이 간다" },
      { a: "별로 마음에 내키지 않는다", P: 1 },
      { P: 1, a: "생각하면 우울해진다" }
    ],
    index: 20
  },
  {
    question: "나는 평소에",
    answers: [
      { E: 1, a: "자신의 감정과 느낌을 자유스러이 표현하는 편이다." },
      { a: "감정과 느낌을 표현하기보다는 자신 안에 묻어두는 편이다.", I: 0 }
    ],
    index: 29
  },
  {
    answers: [
      {
        a:
          "마지막 순간에 가서 일을 처리하는 것이 불안하고 성미에 맞지 않는 편이다.",
        J: 1
      },
      { a: "마지막 순간에 가서 일을 처리하기를 좋아한다.", P: 1 }
    ],
    index: 36,
    question: "나는"
  },
  {
    question: "나는 대화 도중에 당혹한 상황에 처했을 때",
    answers: [
      { E: 1, a: "농담으로 돌린다" },
      { I: 2, a: "며칠 후에야 그때 무슨 얘기를 했어야 되었다고 생각한다." },
      { I: 0, a: "대화의 주제를 바꾼다" }
    ],
    index: 49
  },
  { answers: [{ S: 1, a: "제작" }, { N: 0, a: "설계" }], index: 74 },
  {
    index: 89,
    answers: [
      { "T(F)": 0, "T(M)": 0, a: "토론하다" },
      { a: "동의하다", "F(F)": 1, "F(M)": 0 }
    ]
  },
  { answers: [{ S: 1, a: "표식" }, { N: 0, a: "상징" }], index: 91 }
];
export default () => {
  const [q, setQ] = useState(Example);
  // useEffect(() => {
  //   questions20()
  //.then(result => JSON.parse(result.data.text))
  //.then(r => setQ(r));
  // }, []);
  function radioChangeHandler(e: SyntheticEvent) {
    const index = Number(e.currentTarget.getAttribute("name"));
    const value = e.currentTarget.getAttribute("value");
    const qe = q.find(a => a.index === index);
    if (qe) {
      qe.checked = true;
      qe.score = JSON.parse(value!);
    }
    setQ(q);
    // console.log(value);
    // console.log(index, qe, q);
  }
  return (
    <form>
      <h1 style={{ textAlign: "center" }}>황서원의 성격은 어떤가요?</h1>
      <ul>
        {q.map((e, i) => {
          const { answers, question, index, checked } = e;
          return (
            <li key={i}>
              <h2>
                {i + 1}
                {question && `: ${question}`}
              </h2>
              {answers.map(e => {
                const { a, ...rest } = e;
                const name = JSON.stringify(rest);
                const rand = String(Math.random());
                return (
                  <div key={rand}>
                    <input
                      id={rand}
                      type="radio"
                      name={String(index)}
                      value={name}
                      onChange={radioChangeHandler}
                    />
                    <label htmlFor={rand}>{a}</label>
                  </div>
                );
              })}
            </li>
          );
        })}
      </ul>
      <div style={{ textAlign: "center" }}>
        <button style={{ fontSize: 30 }}>확인</button>
      </div>
    </form>
  );
};
