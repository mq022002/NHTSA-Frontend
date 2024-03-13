import React, { useState } from "react";
import axios from "axios";
import CarForm from "./CarForm";
import CarRatings from "./CarRatings";
import CarRecalls from "./CarRecalls";

export default function CarFetcher() {
  const [data, setData] = useState({ recalls: [], ratings: [] });
  const [errorMessage, setErrorMessage] = useState("");
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [activeRecallTab, setActiveRecallTab] = useState(0);

  const fetchData = async (year, make, model) => {
    try {
      const response = await axios.get(
        `/api/fetchData?year=${year}&make=${make}&model=${model}`
      );
      setData({
        recalls: response.data.recalls,
        ratings: response.data.ratings,
      });
      setErrorMessage("");
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

        <CarForm fetchData={fetchData} />

        {errorMessage && (
          <p className="text-[#832C31] text-center mt-5">{errorMessage}</p>
        )}

        {hasFetchedData && (
          <div className="flex justify-between mt-2">
            <CarRatings ratings={data.ratings} />
            <div className="w-1/2 pl-2">
              <CarRecalls
                recalls={data.recalls}
                activeRecallTab={activeRecallTab}
                handleRecallTabChange={handleRecallTabChange}
              />{" "}
              {/* use the CarRecalls component here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
