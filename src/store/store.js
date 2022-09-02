import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { projectConfigSlice } from "./projectConfigSlice";
import { sidebarSlice } from "./sidebarSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    sidebar: sidebarSlice.reducer,
    projectConfig: projectConfigSlice.reducer
  }
});

export default store;
