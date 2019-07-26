import React from "react";
import useGlobalHook from "use-global-hook";

const initialState = {
  loading: true
};

const actions = {
  setLoading: store => {
    store.setState({ loading: !store.state.loading });
  }
};
const useGlobal = useGlobalHook(React, initialState, actions);
export default useGlobal;
