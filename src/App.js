import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./routes/auth/auth.component";
import Directory from "./routes/directory/directory.component";
import Navigation from "./routes/navigation/navigation.component";

import "./App.css";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/directory");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="auth" element={<Auth />} />
        <Route path="directory" element={<Directory />} />
      </Route>
    </Routes>
  );
};

export default App;
