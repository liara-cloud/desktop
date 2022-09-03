import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { projectConfigSlice } from "./projectConfigSlice";
import { sidebarSlice } from "./sidebarSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    sidebar: sidebarSlice.reducer,
    projectConfig: projectConfigSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
