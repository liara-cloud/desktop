import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  path: ""
};

export const projectConfigSlice = createSlice({
  name: "projectConfig",
  initialState,
  reducers: {
    config: (state, { payload }) => {
      state.path = payload.path;
    }
  }
});

export const { config } = projectConfigSlice.actions;
