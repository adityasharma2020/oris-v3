import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import { Toaster } from "react-hot-toast";
import { createPortal } from "react-dom";
import SideBar from "./components/SideBar/SideBar";
import AppBar from "./components/AppBar/AppBar";
import styles from "./App.module.scss";
import GcSkewPage from "./pages/GcSkewPage/GcSkewPage";
import AtSkewPage from "./pages/AtSkewPage/AtSkewPage";
import SearchSequencePage from "./pages/SearchSequencePage/SearchSequencePage";
import SkewCalculator from "./pages/SkewCalculator/SkewCalculator";

function App() {
  return (
    <BrowserRouter>
      {customToast()}
      <Routes>
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedRoutes() {
  const name = localStorage.getItem("listed-name");
  const email = localStorage.getItem("listed-email");

  const checkAuthentication = () => {
    if (name && email) {
      return true;
    }
    return false;
  };

  return checkAuthentication() ? (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.mainContent}>
        <AppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gc-skew" element={<GcSkewPage />} />
          <Route path="/at-skew" element={<AtSkewPage />} />
          <Route path="/search-sequence" element={<SearchSequencePage />} />
          <Route path="/skew-calculator" element={<SkewCalculator />} />
        </Routes>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

const customToast = () => {
  return createPortal(
    <Toaster
      toastOptions={{
        success: {
          style: {
            fontSize: "1.5rem",
          },
        },
        error: {
          style: {
            fontSize: "1.5rem",
          },
        },
      }}
    />,
    document.getElementById("alert-modal")
  );
};

export default App;
