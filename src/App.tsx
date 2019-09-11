import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import SelectPeopleFromList from "./pages/SelectPeopleFromList";
import UploadProfile from "./pages/UploadProfile";
import MbtiTest8 from "./pages/MbtiTest8";
import Result from "./pages/Result";
import useGlobal from "./store/useGlobal";
import Loader from "./components/Loader";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";

const engine = new Styletron();
const App: React.FC = () => {
  const [{ loading }] = useGlobal("loading");
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Route path="/" component={Header} />
          <div
            style={{
              padding: "0px 1.0875rem 1.45rem",
              paddingTop: 0,
              // maxWidth: 960,
              margin: "0 auto"
            }}
          >
            {loading && <Loader />}
            {/* <Loader /> */}
            <Switch>
              <Route path="/" exact component={SelectPeopleFromList} />
              {/* <Route path="/profile/:id" exact component={Result} /> */}
              <Route path="/test" exact component={MbtiTest8} />
              <Route path="/result" exact component={Result} />
              <Route path="/upload" exact component={UploadProfile} />
            </Switch>
          </div>
        </BrowserRouter>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
