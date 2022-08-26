import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./routes/auth/auth.component";
import Directory from "./routes/directory/directory.component";
import Navigation from "./routes/navigation/navigation.component";

import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Directory />} />
        <Route path="auth" element={<Auth />} />
      </Route>
    </Routes>
  );
};

export default App;
