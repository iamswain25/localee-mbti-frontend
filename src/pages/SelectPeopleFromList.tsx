import React, { useEffect, useState } from "react";
import useGlobal from "../store/useGlobal";
import { functions } from "../firebase";
import { RouteComponentProps } from "react-router-dom";
const selectionList = functions.httpsCallable("selectionList");
type Profile = { counter: number; name: string; id: String };
export default (props: RouteComponentProps) => {
  const [globalState, globalActions] = useGlobal();
  const [list, setList] = useState([]);
  useEffect(() => {
    globalActions.setLoading(true);
    selectionList()
      .then(res => res.data)
      .then(setList)
      .finally(globalActions.loadingIndicatorOff);
  }, [globalActions, globalActions.setLoading]);
  function takeTestHandler(args: Profile) {
    globalActions.setProfile(args);
    props.history.push(`/test`);
  }
  return (
    <div>
      <div style={{ padding: 20 }}>
        <h1 style={{ textAlign: "center", fontSize: 40 }}>성격은 어떨까요?</h1>
        {list.map((e: Profile, i) => (
          <div key={i}>
            <div>
              {String(e.counter)}명의 사람이 {e.name} 성격을 분석하였습니다.
            </div>
            <div>분석에 참여하고 결과를 확인하세요!</div>
            <div>
              <button onClick={() => takeTestHandler(e)}>선택</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
