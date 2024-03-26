import React, { useState } from "react";
import axios from "axios";
import VehicleForm from "./VehicleForm";
import VehicleRatings from "./VehicleRatings";
import VehicleRecalls from "./VehicleRecalls";

export default function VehicleFetcher() {
  const [data, setData] = useState({ recalls: [], ratings: [] });
  const [errorMessage, setErrorMessage] = useState("");
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [activeRecallTab, setActiveRecallTab] = useState(0);

  const fetchData = async (year, make, model) => {
    try {
      setErrorMessage("");
      const response = await axios.get(`/api/fetchData?year=${year}&make=${make}&model=${model}`);
      const msrpResponse = await axios.get(`http://localhost:5000/get-msrp?make=${make}&model=${model}`);
  
      // Simulate adding MSRP to each rating if ratings are expected to be an array
      const updatedRatings = response.data.ratings.map(rating => ({
        ...rating,
        MSRP: msrpResponse.data.MSRP, // Adjust based on actual structure
      }));
      console.log("updated ratings" + updatedRatings);

      setData({
        recalls: response.data.recalls,
        ratings: updatedRatings,
      });
  
      setHasFetchedData(true);
    } catch (error) {
      setErrorMessage("Error fetching data. Please try again.");
      setHasFetchedData(false);
    }
  };
  

  const handleRecallTabChange = (event, newValue) => {
    setActiveRecallTab(newValue);
  };

  return (
    <div className="container mx-auto p-5">
      <div
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 text-black"
        style={{ padding: "50px 20px", width: "auto", margin: "20px auto" }}
      >
        <h2 className="text-[#832C31] text-lg font-bold mb-5">
          Get Vehicle Information
        </h2>

        <VehicleForm fetchData={fetchData} />

        {errorMessage && (
          <p className="text-[#832C31] text-center mt-5">{errorMessage}</p>
        )}

        {hasFetchedData && (
          <div className="flex justify-between mt-2">
            <VehicleRatings ratings={data.ratings} />
            <VehicleRecalls
              recalls={data.recalls}
              activeRecallTab={activeRecallTab}
              handleRecallTabChange={handleRecallTabChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
