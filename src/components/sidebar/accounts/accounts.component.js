import { ipcRenderer } from "electron";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../../store/authSlice";
import sliceText from "../../../utility/sliceText.util";
import {
  Account,
  AccountAvatar,
  AccountsContaienr,
  BadgeRegion
} from "./accounts.styles";

const Accounts = () => {
  const { accounts, currentAccount } = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handlechengeCurrent = (email, region) => {
    if (currentAccount.email !== email) {
      ipcRenderer.send("change-current", {
        email,
        region
      });
    }
  };

  useEffect(() => {
    ipcRenderer.on("change-current", (_, arg) => {
      dispatch(user(arg));
    });
  }, []);

  return (
    <AccountsContaienr>
      {accounts.map(
        ({ account_name, current, email, region, avatar, fullname }) => {
          return (
            <Account
              key={account_name}
              current={current}
              onClick={() => handlechengeCurrent(email, region)}
            >
              <AccountAvatar src={avatar} alt={`avatar-${account_name}`} />
              <p>{sliceText(fullname, 14)}</p>
              <BadgeRegion src={region} />
            </Account>
          );
        }
      )}
    </AccountsContaienr>
  );
};

export default Accounts;
