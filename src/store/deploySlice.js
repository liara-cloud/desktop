import { createSlice } from "@reduxjs/toolkit";

export const initialStateDeploy = {
  log: [],
  state: "",
  status: "",
  percent: 0,
  total: 0,
  transferred: 0
};

let data = [];
export const deploySlice = createSlice({
  name: "deploy",
  initialState: initialStateDeploy,
  reducers: {
    deployState: (state, { payload }) => {
      data += payload.log;

      state.status = payload.status;
      state.state = payload.state;
      state.log = data;
      state.percent = payload.percent;
      state.total = payload.total;
      state.transferred = payload.total;
    }
  }
});

export const { deployState } = deploySlice.actions;
