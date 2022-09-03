import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  initialState,
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
