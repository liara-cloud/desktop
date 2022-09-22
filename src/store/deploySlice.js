import { createSlice } from "@reduxjs/toolkit";

export const initialStateDeploy = {
  log: [],
  state: "",
  status: "",
  percent: 0,
  total: 0,
  transferred: 0
};

export let logs = [];
export const deploySlice = createSlice({
  name: "deploy",
  initialState: initialStateDeploy,
  reducers: {
    deployState: (state, { payload }) => {
      logs += payload.log;

      if (payload.status === "redeploy") {
        logs = [];
      }

      state.status = payload.status;
      state.state = payload.state;
      state.log = logs;
      state.percent = payload.percent;
      state.total = payload.total;
      state.transferred = payload.total;
    }
  }
});

export const { deployState } = deploySlice.actions;
