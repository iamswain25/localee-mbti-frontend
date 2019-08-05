import React from "react";
// import useGlobal from "../store/useGlobal";
// import Preview, { Files } from "../components/Preview";
import { RouteComponentProps } from "react-router-dom";
import { firestore /* storage */ } from "../firebase";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import unfurl from "unfurl.js/dist/index.js";
let nameInput: HTMLInputElement | null;
// let imgInput: Files;
export default (props: RouteComponentProps) => {
  // const [{ profile } /* globalActions */] = useGlobal("profile");
  const [gender, setGender] = React.useState("");
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  async function checkName() {
    const unControlledName = nameInput!.value;
    if (unControlledName.length < 1) {
      // alert("이름을 입력하세요.");
      return;
    }
    const exists = await firestore
      .collection("profile")
      .doc(unControlledName!)
      .get()
      .then(res => res.exists);
    if (exists) {
      nameInput!.style.border = "2px solid red";
      alert("이미 존재하는 이름입니다.");
    } else {
      nameInput!.style.border = "2px solid green";
      setName(unControlledName);
    }
    return exists;
  }
  async function submit() {
    if (gender.length < 1) {
      alert("성별을 확인하세요.");
      return;
    }
    // if (!imgInput[0]) {
    //   alert("사진을 업로드하세요.");
    //   return;
    // }
    if (name.length < 1) {
      return;
    }
    if (link.length < 1) {
      return;
    }
    console.log(name);
    console.log(gender);
    firestore
      .collection("profile")
      .doc(name)
      .set({ counter: 0, gender, name, link, createdAt: new Date() })
      .then(console.log)
      .then(() => props.history.push("/"))
      .catch(alert);
    // console.log(imgInput[0]);
    // storage
    //   .ref()
    //   .child(`profiles/${name}`)
    //   .put(imgInput[0])
    //   .then(console.log)
    //   .then(() =>
    //     firestore
    //       .collection("profile")
    //       .doc(name)
    //       .set({ counter: 0, gender, name })
    //   )
    //   .then(console.log)
    //   .catch(alert);
  }
  function imgOnError() {
    unfurl(link)
      .then(({ open_graph }: { open_graph: any }) => {
        const { images } = open_graph;
        const [image] = images;
        const { url } = image;
        setLink(url);
      })
      .catch(console.error);
  }
  return (
    <div>
      <h3>1. 이름을 입력하세요</h3>
      <input
        type="text"
        ref={r => (nameInput = r)}
        maxLength={20}
        onBlur={checkName}
      />
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
      <h3>3. 사진을 링크로 거세요</h3>
      <div>
        <input
          type="text"
          onChange={e => setLink(e.target.value)}
          value={link}
        />
      </div>
      {link.length > 0 && (
        <div>
          <img src={link} alt="profile img" onError={imgOnError} />
        </div>
      )}
      {/* <Preview getFiles={r => (imgInput = r)} /> */}
      <button onClick={submit}>전송</button>
    </div>
  );
};
