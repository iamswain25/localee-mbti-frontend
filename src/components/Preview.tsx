import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { filesAtom } from "../store/jotai";

const thumbsContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb: React.CSSProperties = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 300,
  height: 300,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner: React.CSSProperties = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img: React.CSSProperties = {
  display: "block",
  width: "auto",
  height: "100%",
};
export type Files = Array<File & { preview: string }>;
export default function Preview() {
  const [files, setFiles] = useAtom(filesAtom);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="preview" />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {files.length < 1 && <p>클릭하여 업로드</p>}
        <aside style={thumbsContainer}>{thumbs}</aside>
      </div>
    </section>
  );
}
