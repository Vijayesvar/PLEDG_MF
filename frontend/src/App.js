import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import WaitlistForm from "./components/WaitlistForm";
import WaitlistDashboard from "./components/WaitlistDashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/waitlist" element={<WaitlistForm />} />
          <Route path="/dashboard" element={<WaitlistDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;