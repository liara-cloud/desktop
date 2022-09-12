import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./global.style";
import Auth from "./routes/auth/auth.component";
import Build from "./routes/build/build.component";
import Cancel from "./routes/cancel/cancel.component";
import Config from "./routes/config/config.component";
import Directory from "./routes/directory/directory.component";
import Error from "./routes/error/erorr.component";
import Init from "./routes/init/init.component";
import Navigation from "./routes/navigation/navigation.component";
import Publish from "./routes/publish/publish.component";
import Upload from "./routes/upload/upload.component";

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Directory />} />
          <Route path="auth" element={<Auth />} />
          <Route path="config" element={<Config />} />

          {/* deploy state */}
          <Route path="init" element={<Init />} />
          <Route path="upload" element={<Upload />} />
          <Route path="build" element={<Build />} />
          <Route path="cancel" element={<Cancel />} />
          <Route path="error" element={<Error />} />
          <Route path="publish" element={<Publish />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default App;
