import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    accounts: [],
    currentAccounts: {},
    isLoading: true
  }
};

const mapArgument = (arg) =>
  arg.map((item) => {
    return {
      account_name: Object.keys(item)[0],
      ...Object.values(item)[0]
    };
  });

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    user: (state, { payload }) => {
      const accounts = mapArgument(payload);
      const currentAccounts = accounts.filter((item) => item.current)[0];
      state.list = accounts;
      state.currentAccount = currentAccounts;
      state.isLoading = false;
    }
  }
});

export const { user } = authSlice.actions;
