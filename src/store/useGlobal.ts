import React from "react";
import useStore, { usePersist, Store } from "./useGlobalHooks";

const initialState = {
  loading: true,
  profile: {
    id: null,
    name: null
  }
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
  }
};

const key = "localee-mbti";
const useGlobal: (any?: any) => [any, typeof actions] = usePersist(
  React,
  initialState,
  actions,
  key
);
// const useGlobal = useStore(React, initialState, actions);
export default useGlobal;
