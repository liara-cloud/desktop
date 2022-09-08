import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  log: [],
  state: "",
  status: "",
  percent: 0,
  total: 0,
  transferred: 0
};

export const deploySlice = createSlice({
  name: "deploy",
  initialState,
  reducers: {
    deployState: (state, { payload }) => {
      state.status = payload.status;
      state.state = payload.state;
      state.log = [...payload.log, payload.log];
      state.percent = payload.percent;
      state.total = payload.total;
      state.transferred = payload.total;
    }
  }
});

export const { deployState } = deploySlice.actions;
