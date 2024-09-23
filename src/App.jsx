import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Home, OnBoarding } from "./pages";
import { useStateContext } from "./context";
import { usePrivy } from "@privy-io/react-auth";
import MedicalRecord from "./pages/records/index";

const App = () => {
  const { currentUser } = useStateContext();
  const { user, authenticated, ready, login } = usePrivy();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !authenticated) {
      login();
    } else if (user && !currentUser) {
      navigate("/onboarding");
    }
  }, [ready, currentUser, navigate]);

  return (
    <div className="relative flex min-h-screen flex-row bg-[#13131a]">
      <div className="relative ml-10 hidden sm:flex">
        <Sidebar />
      </div>

      <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<OnBoarding />} />
          <Route path="/profile" element={<OnBoarding />} />
          <Route path="/medical-records" element={<MedicalRecord />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
