import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Analytics from "./pages/Dashboard/Analytics";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import FormElements from "./pages/Form/FormElements";
import FormLayout from "./pages/Form/FormLayout";
import Tables from "./pages/Tables";
import Settings from "./pages/Settings";
import Chart from "./pages/Chart";
import Alerts from "./pages/UiElements/Alerts";
import Buttons from "./pages/UiElements/Buttons";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";

const App = (): JSX.Element => {
  const [loading, setLoading] = useState(true);

  const preloader = document.getElementById("preloader");

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = "none";
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div>
      {!loading && (
        <div>
          <Routes>
            <Route path="/" element={<Analytics />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forms/form-elements" element={<FormElements />} />
            <Route path="/forms/form-layout" element={<FormLayout />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/ui/alerts" element={<Alerts />} />
            <Route path="/ui/buttons" element={<Buttons />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
