import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./routes/auth/auth.component";
import Directory from "./routes/directory/directory.component";
import Navigation from "./routes/navigation/navigation.component";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { ipcRenderer } from "electron";
import { user } from "./store/authSlice";

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
