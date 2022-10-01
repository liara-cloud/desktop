import { createSlice } from "@reduxjs/toolkit";

export const initialStatePathConfig = {
  path: ""
};

export const pathConfigSlice = createSlice({
  name: "path",
  initialState: initialStatePathConfig,
  reducers: {
    pathConfig: (state, { payload }) => {
      state.path = payload.path;
    }
  }
});

export const { pathConfig } = pathConfigSlice.actions;
