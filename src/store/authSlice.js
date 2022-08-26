import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: []
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}
});
