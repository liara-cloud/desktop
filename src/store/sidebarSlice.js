import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    }
  }
});

export const { toggle } = sidebarSlice.actions;
