import React, { useState, useEffect } from "react";
import axios from "axios";
import VehicleForm from "./VehicleForm";
import VehicleRatings from "./VehicleRatings";
import VehicleRecalls from "./VehicleRecalls";
import { calculateInsuranceRate } from "./RateCalculator";
import VehicleImage from "../hooks/VehicleImage";
import CircularDeterminate from "../mui/CircularDeterminate";

export default function VehicleFetcher() {
  const [data, setData] = useState({
    recalls: [],
    ratings: [],
    insuranceRate: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [activeRecallTab, setActiveRecallTab] = useState(0);
  const [scrapedData, setScrapedData] = useState({ imageUrl: "", linkUrl: "" });
  const [selectedCarIndex, setSelectedCarIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (year, make, model) => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const response = await axios.get(
        `/api/fetchData?year=${year}&make=${make}&model=${model}`,
      );
      const combinedDataResponse = await axios.get(
        `http://localhost:5000/api/car-data?make=${make}&model=${model}`,
      );
      const combinedData = combinedDataResponse.data;

      const updatedRatings = response.data.ratings.map((rating) => ({
        ...rating,
        MSRP: combinedData.msrp_info.MSRP,
      }));

      console.log("updated ratings" + updatedRatings);

      setData({
        recalls: response.data.recalls,
        ratings: updatedRatings,
        insuranceRate: "",
      });

      setScrapedData({
        imageUrl: combinedData.link_info.image_url,
        linkUrl: combinedData.link_info.link_url,
      });

      setHasFetchedData(true);
    } catch (error) {
      setErrorMessage("Error fetching data. Please try again.");
      setHasFetchedData(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCar = (index) => {
    console.log("Car selected at index:", index);
    setSelectedCarIndex(index);
  };

  const parseRating = (rating) =>
    rating === "Not Rated" ? 0 : parseInt(rating, 10);

  const handleRecallTabChange = (event, newValue) => {
    setActiveRecallTab(newValue);
  };

  useEffect(() => {
    if (
      selectedCarIndex !== null &&
      data.ratings &&
      data.ratings.length > selectedCarIndex
    ) {
      const selectedCar = data.ratings[selectedCarIndex];
      if (selectedCar) {
        const msrpValues = selectedCar.MSRP.replace(/[$,]/g, "")
          .split(" - ")
          .map(Number);
        const averageMSRP =
          msrpValues.length === 2
            ? (msrpValues[0] + msrpValues[1]) / 2
            : msrpValues[0];

        const insuranceRate = calculateInsuranceRate(
          averageMSRP,
          parseRating(selectedCar.OverallRating),
          parseRating(selectedCar.OverallFrontCrashRating),
          parseRating(selectedCar.OverallSideCrashRating),
          parseRating(selectedCar.RolloverRating),
          selectedCar.NHTSAElectronicStabilityControl === "Standard",
          selectedCar.NHTSAForwardCollisionWarning === "Yes",
          selectedCar.NHTSALaneDepartureWarning === "Yes",
          data.recalls.length,
        );

        setData((prevData) => ({
          ...prevData,
          insuranceRate: insuranceRate,
        }));
      }
    }
  }, [selectedCarIndex, data.ratings, data.recalls.length]);

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
        {isLoading && <CircularDeterminate />}
        {errorMessage && (
          <p className="text-[#832C31] text-center mt-5">{errorMessage}</p>
        )}
        <VehicleImage scrapedData={scrapedData} />
        {hasFetchedData && (
          <>
          {data.insuranceRate && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Insurance Rate</h3>
              <p>{data.insuranceRate}</p>
            </div>
          )}
            <div className="flex justify-between mt-2">
              <VehicleRatings
                ratings={data.ratings}
                onSelectCar={handleSelectCar}
              />
              <VehicleRecalls
                recalls={data.recalls}
                activeRecallTab={activeRecallTab}
                handleRecallTabChange={handleRecallTabChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
