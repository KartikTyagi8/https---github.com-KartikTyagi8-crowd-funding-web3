import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
// import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x5EB2b726F43b17065AB810003E759fB44D5dB14a"
  );
  console.log(contract);
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    const { title, description, target, deadline, image } = form;
    console.log(
      address, // owner
      title, // title
      description, // description
      target,
      new Date(deadline).getTime(), // deadline,
      image,
      "creating campaign final call"
    );
    try {
      if (title && description && target && deadline && image) {
        const data = await createCampaign({
          args: [
            address,
            title,
            description,
            ethers.utils.parseUnits(target, 18),
            new Date(deadline).getTime(),
            image,
          ],
        });

        console.log("contract call success", data);
      } else {
        console.log("Missing required form fields");
      }
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaings;
  };

  // const getCertificate = async () => {
  //   const sharedCetificate = await contract.call("getShareCertificates", [address]);
  //   const certificates = sharedCetificate.map((certificate) => ({
  //       campaignId: certificate.campaignId,
  //       amount: certificate.amount,
  //   }));
  //   return certificates;
  // }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const fetchFundedCampaigns = async () => {
    const campaigns = await contract.call("getUserFundedCampaigns", [address]);

    const parsedCampaings = campaigns.map((campaign, i) => ({
      funder: campaign.funder,
      campaignId: campaign.campaignId,
      amountFunded:  ethers.utils.formatEther(campaign.amountFunded.toString()),
      redeemed: campaign.redeemed,
      targetAmount: ethers.utils.formatEther(campaign.targetAmount.toString()),
      title: campaign.title,
      description: campaign.description,
      deadline: campaign.deadline.toNumber(),
      image: campaign.image,
      owner: campaign.owner,
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
    }));
    console.log(parsedCampaings);

    return parsedCampaings;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaign", [pId], {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };
  const logout = async () => {
    if (
      connect &&
      connect.currentProvider &&
      typeof connect.currentProvider.disconnect === "function"
    ) {
      console.log("tyagi");
      await connect.currentProvider.disconnect();
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        fetchFundedCampaigns,
        logout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
