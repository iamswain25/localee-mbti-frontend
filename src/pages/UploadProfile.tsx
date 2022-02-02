import React from "react";
import { firestore, storage } from "../firebase";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import { useNavigate } from "react-router";
import Preview from "../components/Preview";
import { useAtom } from "jotai";
import { filesAtom, loadingAtom } from "../store/jotai";
export default function UploadProfile() {
  const [, setLoading] = useAtom(loadingAtom);
  const navigate = useNavigate();
  const [gender, setGender] = React.useState("");
  const [files] = useAtom(filesAtom);
  const nameRef = React.useRef<HTMLInputElement>(null);
  async function checkName() {
    const unControlledName = nameRef.current?.value;
    if (!unControlledName) return;
    const exists = await firestore
      .collection("profile")
      .doc(unControlledName!)
      .get()
      .then((res) => res.exists);
    if (!nameRef.current) return;
    if (exists) {
      nameRef.current.style.border = "2px solid red";
      window.alert("이미 존재하는 이름입니다.");
    } else {
      nameRef.current.style.border = "2px solid green";
    }
    return unControlledName;
  }
  async function submit() {
    const name = await checkName();
    if (!name) return window.alert("이름을 입력하세요.");
    if (!gender) return alert("성별을 확인하세요.");
    if (!files[0]) return window.alert("사진을 첨부하세요.");
    setLoading(true);
    return storage
      .ref("profile")
      .child(name)
      .put(files[0])
      .then(() =>
        firestore
          .collection("profile")
          .doc(name)
          .set({ counter: 0, gender, name, createdAt: new Date() })
      )
      .then(console.log)
      .then(() => navigate("/"))
      .catch(window.alert)
      .finally(() => setLoading(false));
  }
  return (
    <div>
      <h3>1. 이름을 입력하세요</h3>
      <input type="text" ref={nameRef} maxLength={20} onBlur={checkName} />
      <h3>2. 성별을 입력하세요</h3>
      <RadioGroup
        aria-label="gender"
        name="gender"
        onChange={(e, value) => setGender(value)}
        value={gender}
      >
        <FormControlLabel value="F" control={<Radio />} label="여자" />
        <FormControlLabel value="M" control={<Radio />} label="남자" />
      </RadioGroup>
      <h3>3. 사진을 업로드 하세요</h3>
      <Preview />
      <button onClick={submit}>전송</button>
    </div>
  );
}
