import React from "react";
import { usePersist } from "./useGlobalHooks";
import { Result } from "../@types/Result";
// const result = [] as Result[];
const initialState = { result: [] as Result[] };

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
// function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T;
// function usePersistGlobal<T>(args?: any): [T, typeof actions] {
//   return usePersist<T>(key, React, initialState, actions);
// }

const usePersistGlobal: (args?: any) => [any, typeof actions] = usePersist<{
  result: Result[];
}>(key, React, initialState, actions);

export default usePersistGlobal;
