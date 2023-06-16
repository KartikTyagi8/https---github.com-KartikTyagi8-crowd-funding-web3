import React, { useState } from "react";
import jsPDF from "jspdf";

import { tagType, thirdweb } from "../assets";
import { daysLeft, calculateBarPercentage } from "../utils";

const FundedCard = ({
  funder,
  campaignId,
  amountFunded,
  redeemed,
  targetAmount,
  title,
  description,
  deadline,
  image,
  owner,
  amountCollected,
}) => {
  const remainingDays = daysLeft(deadline);
  const percentage = calculateBarPercentage(targetAmount, amountFunded);

  const handleGeneratePDF = async () => {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Set the font size and style for the certificate
    doc.setFontSize(18);
    doc.setFont("bold");

    // Add a title to the certificate
    doc.text("Certificate of Appreciation", 105, 40, { align: "center" });

    // Set the font size and style for the content
    doc.setFontSize(12);
    doc.setFont("normal");

    // Define the field values

    // Add the certificate content
    doc.text(
      `This is to certify that the funder with the address ${funder} has generously contributed an amount of ${amountFunded} to the ${title} campaign owned by the address ${owner}. With their support, we have made significant progress towards our goals and raised awareness about the importance of our cause. Their contribution has made a positive impact and helped us bring about meaningful change. We extend our deepest gratitude to the funder for their valuable support.`,
      25,
      70,
      { maxWidth: 180 }
    );

    // Add the date
    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.text(`Date: ${date}`, 160, 150, { align: "right" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");

    // Add the footer
    const footerText = "Copyright @ crowd-funding-web3";
    const footerWidth =
      (doc.getStringUnitWidth(footerText) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const footerX = (doc.internal.pageSize.width - footerWidth) / doc.internal.scaleFactor;
    const footerY = doc.internal.pageSize.height - 120;
    doc.text(footerText, footerX, footerY, { align: "center" });

    // Save the PDF
    doc.save("Thanking_Certificate.pdf");
  };

  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer">
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="flex justify-between">
          <div className="flex flex-row items-center mb-[18px]">
            <img
              src={tagType}
              alt="tag"
              className="w-[17px] h-[17px] object-contain"
            />
            <p
              className={`ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] ${
                remainingDays < 0 || amountCollected >= targetAmount
                  ? "text-red-700"
                  : "text-green-700"
              }`}
            >
              {remainingDays < 0 || amountCollected >= targetAmount
                ? "Closed"
                : "Open"}
            </p>
          </div>
          <button
            className="font-semibold px-2 rounded-[10px] font-epilogue text-[13px] bg-slate-500"
            onClick={handleGeneratePDF}
          >
            Generate PDF
          </button>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {amountFunded}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Funded of {targetAmount}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src={thirdweb}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundedCard;
