import React, { useState, useEffect } from "react";

import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";

const Funded = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userFundedCampaigns, setUserFundedCampaigns] = useState([]);

  const { address, contract, getUserCampaigns, fetchFundedCampaigns } =
    useStateContext();

  const fetchUserFundedCampaigns = async () => {
    setIsLoading(true);
    const data = await fetchFundedCampaigns();
    setUserFundedCampaigns(data);
    console.log(userFundedCampaigns);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) {
      fetchUserFundedCampaigns();
    }
  }, [address, contract]);
  return (
    <DisplayCampaigns
      title="My funded Campaigns"
      isLoading={isLoading}
      campaigns={userFundedCampaigns}
      message="You have not yet donated to any campaign"
    />
  );
};

export default Funded;
