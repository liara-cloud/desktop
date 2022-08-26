import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    accounts: [],
    currentAccount: {}
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
    user: ({ user }, { payload }) => {
      const accounts = mapArgument(payload);
      const currentAccount = accounts.filter((item) => item.current)[0];
      user.accounts = accounts;
      user.currentAccount = currentAccount;
    }
  }
});

export const { user } = authSlice.actions;
