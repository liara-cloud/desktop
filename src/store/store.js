import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { projectConfigSlice } from "./projectConfigSlice";
import { sidebarSlice } from "./sidebarSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { deploySlice } from "./deploySlice";
import { projectsSlice } from "./projectsSlice";
import { pathConfigSlice } from "./pathSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    sidebar: sidebarSlice.reducer,
    projectConfig: projectConfigSlice.reducer,
    deploy: deploySlice.reducer,
    projects: projectsSlice.reducer,
    path: pathConfigSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
