// REACT ROUTER AND ROUTES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HOME_ROUTE, MENU_ROUTE, TEST_ROUTE } from "./lib/routes";

// VIEWS
import { MenuPage } from "./views/menu-page";
import { TestPage } from "./views/test-page";
import { HistoryPage } from "./views/scan-history";

// OTHER IMPORTS
import { useDispatch } from "react-redux";    // Dispatching actions to the Redux store
import { useAppSelector } from "./app/hooks"; // Reading from the Redux store
import { ScanPage } from "./views/scan-page";
import { Toaster } from "./components/ui/toaster";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { useEffect, useRef } from "react";
import { setEggCountingApparatusID } from "./features/egg-counting-apparatus/egg-counting-apparatus-slice";
import { WebcamProvider } from "./lib/webcam-provider";
// APP
function App() {
  const dispatch = useDispatch();

  const user = useAppSelector((state) => state.reducer.user);
  const eggCountingApparatusID = useAppSelector((state) => state.reducer.eggCountingApparatus?.eggCountingApparatusID);
  const id_input = useRef("");
  console.log(id_input.current);

  return (
    <>
      {eggCountingApparatusID === "undefined"? (
        <div>
          <h1>Input Egg Counting Apparatus ID</h1>
          <Input type = "text" onChange={(e) => id_input.current = (e.target.value)} placeholder= "Enter egg counting apparatus ID" />
          <Button onClick = {() => dispatch(setEggCountingApparatusID(id_input.current))}>Submit</Button>
        </div>
      )
      :
      (
        <WebcamProvider>
          <Toaster />
          <Router>
            <Routes>
              <Route path = {MENU_ROUTE} element = {<MenuPage />} />
              <Route path = {HOME_ROUTE} element = {<ScanPage />} />
              <Route path = {TEST_ROUTE} element = {<TestPage />} />
              <Route path = "*" element = {<h1>Not Found</h1>} />
            </Routes>
          </Router>
        </WebcamProvider>
      )}
    </>
  );
};

export default App