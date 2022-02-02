import { Block } from "baseui/block";
import { StyledSpinnerNext } from "baseui/spinner";
import { useAtom } from "jotai";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { loadingAtom, resultAtom } from "../store/jotai";
export default function Header() {
  const [result] = useAtom(resultAtom);
  const [loading] = useAtom(loadingAtom);
  return (
    <section>
      <div>
        <NavLink to="/" style={{ marginLeft: 10 }}>
          Home
        </NavLink>
        {result.profile && (
          <NavLink to="result" style={{ marginLeft: 10 }}>
            Result
          </NavLink>
        )}
        <NavLink to="upload" style={{ marginRight: 10, float: "right" }}>
          upload
        </NavLink>
      </div>
      <div
        style={{
          padding: "0px 1.0875rem 1.45rem",
          paddingTop: 0,
          margin: "0 auto",
        }}
      >
        {loading && (
          <Block
            position="fixed"
            width="100%"
            height="100%"
            top="0"
            left="0"
            display={"flex"}
            alignItems="center"
            justifyContent="center"
          >
            <StyledSpinnerNext size={96} />
          </Block>
        )}
        <Outlet />
      </div>
    </section>
  );
}
