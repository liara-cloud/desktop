import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: [],
  currentAccount: {}
};

const mapArgument = (payload) =>
  payload.map((item) => {
    return {
      account_name: Object.keys(item)[0],
      ...Object.values(item)[0]
    };
  });

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    add: (state, { payload }) => {
      const accounts = mapArgument(payload);
      state.accounts = accounts;
    },
    current: (state, { payload }) => {
      const accounts = mapArgument(payload);
      const currentAccount = accounts.filter((item) => item.current)[0];
      state.currentAccount = currentAccount;
    }
  }
});

export const { add, current } = authSlice.actions;
