import React from "react";
import { usePersist } from "./useGlobalHooks";

const initialState = {
  loading: true,
  profile: {
    name: null
  },
  result: []
};

const actions = {
  setLoading(this: any, args: any) {
    this.setState({ loading: args });
  },
  loadingIndicatorOff(this: any) {
    this.setState({ loading: false });
  },
  loadingIndicatorOn(this: any) {
    this.setState({ loading: false });
  },
  setProfile(this: any, args: any) {
    this.setState({ profile: args });
  },
  setResult(this: any, args: any) {
    const { result = [] } = this.state;
    this.setState({ result: [...result, args] });
  },
  emptyResult(this: any) {
    this.setState({ result: [] });
  }
};

const key = "localee-mbti";
const useGlobal: (args?: any) => [any, typeof actions] = usePersist(
  key,
  React,
  initialState,
  actions
);
// const useGlobal = useStore(React, initialState, actions);
export default useGlobal;
