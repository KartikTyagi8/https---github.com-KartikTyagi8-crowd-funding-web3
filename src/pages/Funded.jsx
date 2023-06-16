import React, { useState, useEffect } from "react";

import { DisplayFundedCampaigns } from "../components";
import { useStateContext } from "../context";

const Funded = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userFundedCampaigns, setUserFundedCampaigns] = useState([]);

  const { address, contract, fetchFundedCampaigns } =
    useStateContext();

  const fetchUserFundedCampaigns = async () => {
    setIsLoading(true);
    const data = await fetchFundedCampaigns();
    setUserFundedCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) {
      fetchUserFundedCampaigns();
    }
  }, [address, contract]);
  return (
    <DisplayFundedCampaigns
      title="My Funded Campaigns"
      isLoading={isLoading}
      campaigns={userFundedCampaigns}
      message="You have not yet donated to any campaign"
    />
  );
};

export default Funded;
