import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import Auth from "./routes/auth/auth.component";
import Navigation from "./routes/navigation/navigation.component";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/auth");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="auth" element={<Auth />} />
      </Route>
    </Routes>
  );
};

export default App;
