import { createSlice } from "@reduxjs/toolkit";
import { AnsiUp } from "ansi-up";

export const initialStateDeploy = {
  log: [],
  state: "",
  status: "",
  percent: 0,
  total: 0,
  transferred: 0
};

let data = [];
let ansi_up = new AnsiUp();
export const deploySlice = createSlice({
  name: "deploy",
  initialState: initialStateDeploy,
  reducers: {
    deployState: (state, { payload }) => {
      let html = ansi_up.ansi_to_html(payload.log);
      data += html;

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
