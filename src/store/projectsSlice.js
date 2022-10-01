import { createSlice } from "@reduxjs/toolkit";

export const initialState = { data: [] };

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    allProjects: (state, { payload }) => {
      state.data = payload;
    }
  }
});

export const { allProjects } = projectsSlice.actions;
