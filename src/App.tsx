import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SelectPeopleFromList from "./pages/SelectPeopleFromList";
import UploadProfile from "./pages/UploadProfile";
import MbtiTest8 from "./pages/MbtiTest8";
import Result from "./pages/Result";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";

const engine = new Styletron();
const App: React.FC = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route element={<Header />}>
              <Route path="/" element={<SelectPeopleFromList />} />
              <Route path="/test/:id" element={<MbtiTest8 />} />
              <Route path="/result" element={<Result />} />
              <Route path="/upload" element={<UploadProfile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
