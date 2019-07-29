export type Store = {
  listeners: Array<{ call: any; connect: string | string[] | undefined }>;
  associatedActions: any;
  state: any;
  setState: (state: any) => void;
  key?: string;
};

function setState(this: Store, newState: any) {
  this.state = { ...this.state, ...newState };
  this.listeners.forEach(listener => {
    const connected =
      listener.connect &&
      Object.keys(newState).some(key => listener.connect!.indexOf(key) >= 0);
    if (connected) {
      listener.call(this.state);
    }
  });
}

function useCustom(
  this: Store,
  React: any,
  connect?: string | string[]
): [any, any] {
  // if (arguments.length > 1) console.log(arguments);
  console.log(this.listeners);
  const newListener = React.useState()[1];
  React.useEffect(() => {
    const newobj = { call: newListener, connect };
    this.listeners.push(newobj);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== newobj);
    };
  }, [connect, newListener]);
  if (typeof connect === "string") {
    return [this.state[connect], this.associatedActions];
  } else if (typeof connect === "object") {
    const state = connect
      .map(a => ({ [a]: this.state[a] }))
      .reduce((acc, cur) => ({ ...acc, cur }));
    return [state, this.associatedActions];
  } else {
    return [this.state, this.associatedActions];
  }
  // return [this.state, this.associatedActions];
}

function associateActions(store: Store, actions: any) {
  const associatedActions: Store["associatedActions"] = {};
  Object.keys(actions).forEach(key => {
    if (typeof actions[key] === "function") {
      associatedActions[key] = actions[key].bind(store);
    }
    if (typeof actions[key] === "object") {
      associatedActions[key] = associateActions(store, actions[key]);
    }
  });
  return associatedActions;
}

const useStore = (
  React: any,
  initialState: any,
  actions: any,
  initializer?: (store: Store) => void
) => {
  const store: Store = {
    state: initialState,
    listeners: [],
    setState,
    associatedActions: {}
  };
  store.setState = setState.bind(store);
  store.associatedActions = associateActions(store, actions);
  if (initializer) initializer(store);
  return useCustom.bind(store, React);
};

export default useStore;

export const usePersist = (
  React: any,
  initialState: any,
  actions: any,
  key: string
) => {
  if (typeof key !== "string") {
    console.error("must have key as string value");
  }
  if (!window || !window.localStorage) {
    console.error("localStorage doens't exist in your environment");
  }
  const local = window.localStorage.getItem(key);
  const store: Store = {
    state: local ? JSON.parse(local) : initialState,
    listeners: [],
    key,
    setState,
    associatedActions: {}
  };
  store.setState = setPersistState.bind(store);
  store.associatedActions = associateActions(store, actions);
  return useCustom.bind(store, React);
};

function setPersistState(this: Store, newState: any) {
  this.state = { ...this.state, ...newState };
  window.localStorage.setItem(this.key!, JSON.stringify(this.state));
  this.listeners.forEach(listener => {
    const connected =
      listener.connect &&
      Object.keys(newState).some(key => listener.connect!.indexOf(key) >= 0);
    if (connected) {
      listener.call(this.state);
    }
  });
}