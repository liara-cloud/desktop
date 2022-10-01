import React from "react";
import { CurrentSectionContainer } from "./current-section.styles";
import { useSelector } from "react-redux";
import { BadgeRegion } from "../accounts/accounts.styles";
import sliceText from "../../../utility/slice-text.utils";

const CurrentSection = () => {
  const { avatar = "", region, fullname = "", email = "" } = useSelector(
    state => state.auth.user.currentAccount
  );

  return (
    <CurrentSectionContainer>
      <div>
        <img src={`https:${avatar}`} width="65px" />
        <BadgeRegion src={region} />
      </div>
      <h4>
        {sliceText(fullname, 20)}
      </h4>
      <p>
        {sliceText(email, 25)}
      </p>
    </CurrentSectionContainer>
  );
};

export default CurrentSection;
