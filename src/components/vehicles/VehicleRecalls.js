import React, { useState, useEffect } from "react";

const RecallInfoBox = ({ recallItem }) => (
  <div className="border border-gray-300 rounded p-4 my-2">
    <h2 className="text-lg font-semibold">Component: {recallItem.Component}</h2>
    <p className="text-base">Summary: {recallItem.Summary}</p>
    <p className="text-sm">Consequence: {recallItem.Consequence}</p>
    <p className="text-sm">Remedy: {recallItem.Remedy}</p>
  </div>
);

const VehicleRecalls = ({ recalls, handleRecallTabChange }) => {
  const [activeRecallTab, setActiveRecallTab] = useState(0);

  useEffect(() => {
    setActiveRecallTab(0);
  }, [recalls]);

  return (
    <div className="w-1/2 pl-2">
      {recalls.length > 0 ? (
        <>
          <div className="overflow-auto flex flex-col">
            {recalls.map((recall, index) => (
              <button
                key={index}
                onClick={() => {
                  handleRecallTabChange(index);
                  setActiveRecallTab(index);
                }}
                className={`py-2 rounded text-xs my-2 ${
                  activeRecallTab === index ? "bg-[#cc6066]" : ""
                }`}
              >
                {recall.Component}
              </button>
            ))}
          </div>
          {recalls[activeRecallTab] && (
            <div className="pt-3">
              <h2 className="text-lg font-semibold">
                Recall Details for {recalls[activeRecallTab].Component}
              </h2>
              <RecallInfoBox recallItem={recalls[activeRecallTab]} />
            </div>
          )}
        </>
      ) : (
        <p>No recall information available.</p>
      )}
    </div>
  );
};

export default VehicleRecalls;
