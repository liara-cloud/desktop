import { createSlice } from "@reduxjs/toolkit";

export const initialStateConfig = {
  path: "",
  projects: [],
  config: {
    app: "",
    platform: "",
    port: ""
  }
};

export const projectConfigSlice = createSlice({
  name: "projectConfig",
  initialState: initialStateConfig,
  reducers: {
    config: (state, { payload }) => {
      state.path = payload.path;
      state.projects = payload.projects;
      state.config.app = payload.config?.app;
      state.config.platform = payload.config?.platform;
      state.config.port = payload.config?.port;
    }
  }
});

export const { config } = projectConfigSlice.actions;
