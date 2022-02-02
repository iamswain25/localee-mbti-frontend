import { StyledSpinnerNext } from "baseui/spinner";
import React from "react";
import { storage } from "../firebase";
import { Profile } from "../store/jotai";

export default function ProfileImage(props: { profile: Profile }) {
  const { profile } = props;
  const mountedRef = React.useRef(true);
  const [link, setLink] = React.useState<string | undefined>(profile.link);
  React.useEffect(() => {
    if (!profile.link && profile.name) {
      storage
        .ref("profile")
        .child(profile.name)
        .getDownloadURL()
        .then((link) => {
          if (!mountedRef.current) return;
          setLink(link);
        });
      return () => {
        mountedRef.current = false;
      };
    }
    // eslint-disable-next-line
  }, []);
  if (!link) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 300,
          height: 200,
          margin: "auto",
        }}
      >
        <StyledSpinnerNext size={96} />;
      </div>
    );
  }
  return (
    <img
      src={link}
      alt="profile img"
      style={{
        width: 300,
        objectFit: "cover",
        height: 200,
      }}
    />
  );
}
