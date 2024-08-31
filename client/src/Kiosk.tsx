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

// APP
function App() {
  const dispatch = useDispatch();

  const user = useAppSelector((state) => state.reducer.user);
  console.log(user);
  
  return (
    <>
      <Router>
        <Toaster />
        <Routes>
          <Route path = {MENU_ROUTE} element = {<MenuPage />} />
          <Route path = {HOME_ROUTE} element = {<ScanPage />} />
          <Route path = {TEST_ROUTE} element = {<TestPage />} />
          <Route path = "*" element = {<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
};

export default App