import React from "react";
import { BrowserRouter, Switch, Route, RouteProps } from "react-router-dom";
// import Header from "./components/Header";
import SelectPeopleFromList from "./pages/SelectPeopleFromList";
import MbtiTest8 from "./pages/MbtiTest8";
import Result from "./pages/Result";
import useGlobal from "./store/useGlobal";
import Loader from "./components/Loader";
import "./index.css";
const App: React.FC = () => {
  const [globalState, globalActions] = useGlobal();
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {/* <Route
        path="/"
        component={(props: RouteProps) => <Header {...props} />}
      /> */}
      <div
        style={{
          padding: "0px 1.0875rem 1.45rem",
          paddingTop: 0,
          maxWidth: 960,
          margin: "0 auto"
        }}
      >
        {globalState.loading && <Loader />}
        <Switch>
          <Route path="/" exact component={SelectPeopleFromList} />
          {/* <Route path="/profile/:id" exact component={Result} /> */}
          <Route path="/test/:id" exact component={MbtiTest8} />
          <Route path="/result/:id" exact component={Result} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
