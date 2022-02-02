import React, { useEffect, useState } from "react";
import { functions } from "../firebase";
import { useAtom } from "jotai";
import { loadingAtom } from "../store/jotai";
import ProfileImage from "../components/ProfileImage";
import { Link } from "react-router-dom";
const selectionList = functions.httpsCallable("selectionList");
type Profile = { counter: number; name: string; link: string };
export default function SelectPeopleFromList() {
  const [loading, setLoading] = useAtom(loadingAtom);
  const [list, setList] = useState([]);
  useEffect(() => {
    setLoading(true);
    selectionList()
      .then((res) => res.data)
      .then(setList)
      .finally(() => setLoading(false));
  }, [setLoading]);
  if (loading) return null;
  return (
    <div>
      <div style={{ padding: 20 }}>
        <h1 style={{ textAlign: "center", fontSize: 40 }}>
          🧩 사람들이 생각하는 이 사람의 MBTI는 무엇일까요? 8개 질문에 참여하고
          통계를 확인해보세요!
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {list.map((e: Profile, i) => (
            <Link
              key={i}
              to={`/test/${e.name}`}
              style={{
                padding: 10,
                width: 400,
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              <h2>
                🧩 {e.name} ({String(e.counter)}명 참가)
              </h2>
              <ProfileImage profile={e} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
