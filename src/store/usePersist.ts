import React from "react";
import { usePersist } from "./useGlobalHooks";

const initialState = {
  result: []
};

const actions = {
  setResult(this: any, args: any) {
    const { result = [] } = this.state;
    this.setState({ result: [...result, args] });
  },
  emptyResult(this: any) {
    this.setState({ result: [] });
  }
};

const key = "localee-mbti";
const usePersistGlobal: (args?: any) => [any, typeof actions] = usePersist(
  key,
  React,
  initialState,
  actions
);

export default usePersistGlobal;
