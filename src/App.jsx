import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div className="relative flex min-h-screen flex-row bg-[#13131a]">
      <div className="relative ml-10 hidden sm:flex">
        <Sidebar />
      </div>

      <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
        {/* Navbar */}

        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
