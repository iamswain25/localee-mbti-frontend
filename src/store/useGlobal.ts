import React from "react";
import useStore from "./useGlobalHooks";

const initialState = {
  loading: true,
  profile: {
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
    this.setState({ loading: true });
  },
  setProfile(this: any, args: any) {
    this.setState({ profile: args });
  }
};
const useGlobal: (args?: any) => [any, typeof actions] = useStore(
  React,
  initialState,
  actions
);
export default useGlobal;
