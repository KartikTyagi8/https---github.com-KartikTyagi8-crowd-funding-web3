import React from 'react';
import { useNavigate } from 'react-router-dom';

import FundedCard from './FundedCard';
import { loader } from '../assets';

const DisplayFundedCampaigns = ({ title, isLoading, campaigns, message }) => {

  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            {message}
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundedCard 
          key={campaign.id}
          {...campaign}
        />)}
      </div>
    </div>
  )
}

export default DisplayFundedCampaigns