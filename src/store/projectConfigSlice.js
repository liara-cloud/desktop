import { createSlice } from "@reduxjs/toolkit";

export const initialStateConfig = {
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
      state.config = payload.config;
    }
  }
});

export const { config } = projectConfigSlice.actions;
