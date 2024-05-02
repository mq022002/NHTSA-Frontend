import React, { useState, useEffect } from "react";
import axios from "axios";
import VehicleForm from "./VehicleForm";
import VehicleRatings from "./VehicleRatings";
import VehicleRecalls from "./VehicleRecalls";
import { calculateInsuranceRate } from "../utilities/RateCalculator";
import VehicleImage from "./VehicleImage";
import CircularDeterminate from "../mui/CircularDeterminate";
import useFetchInsuranceParameters from "../../hooks/useFetchInsuranceParameters";

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === "production";

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
  const { parameters: insuranceParameters } = useFetchInsuranceParameters();

  const fetchData = async (year, make, model) => {
    if (!year || !make || !model) {
      setErrorMessage("Please provide a year, make, and model.");
      return;
    }

    let response;
    let combinedDataResponse;

    setIsLoading(true);
    setErrorMessage("");
    const endpoint = process.env.NEXT_PUBLIC_FETCH_DATA_ENDPOINT;

    try {
      response = await axios.get(
        `${endpoint}?year=${year}&make=${make}&model=${model}`
      );

      if (response && response.data) {
        setData({
          recalls: response.data.recalls,
          ratings: response.data.ratings,
          insuranceRate: "",
        });
        setHasFetchedData(true);
      }
    } catch (error) {
      if (!isProduction) {
        console.error("Error fetching data from first API.", error);
      }
    }

    try {
      combinedDataResponse = await axios.get(
        `http://localhost:5000/api/car-data?make=${make}&model=${model}`
      );

      if (combinedDataResponse && combinedDataResponse.data) {
        const combinedData = combinedDataResponse.data;

        const updatedRatings = response?.data?.ratings.map((rating) => ({
          ...rating,
          MSRP: combinedData.msrp_info.MSRP,
        }));

        setData((prevData) => ({
          ...prevData,
          ratings: updatedRatings || prevData.ratings,
        }));

        setScrapedData({
          imageUrl: combinedData.link_info.image_url,
          linkUrl: combinedData.link_info.link_url,
        });
      }
    } catch (error) {
      if (!isProduction) {
        console.error("Error fetching data from second API.", error);
      }
    }

    setIsLoading(false);
  };

  const handleSelectCar = (index) => {
    if (!isProduction) {
      console.log("Car selected at index:", index);
    }
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
      let averageMSRP = 0;

      if (selectedCar && selectedCar.MSRP) {
        const msrpValues = selectedCar.MSRP.replace(/[$,]/g, "")
          .split(" - ")
          .map(Number);
        averageMSRP =
          msrpValues.length === 2
            ? (msrpValues[0] + msrpValues[1]) / 2
            : msrpValues[0];
      }

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
        insuranceParameters
      );

      setData((prevData) => ({
        ...prevData,
        insuranceRate: insuranceRate,
      }));
    }
  }, [
    selectedCarIndex,
    data.ratings,
    data.recalls.length,
    insuranceParameters,
  ]);

  return (
    <div className="container p-5 mx-auto">
      <div
        className="flex flex-col px-8 pt-6 pb-8 my-2 mb-4 text-black bg-white rounded shadow-md"
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
