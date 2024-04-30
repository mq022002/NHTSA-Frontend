import React, { useState } from "react";
import { YEARS, MAKES, MAKE_MODEL_MAPPING } from "../utilities/constants";

export default function VehicleForm({ fetchData }) {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [models, setModels] = useState([]);

  const SelectInput = ({ options, value, onChange, disabled, ...props }) => (
    <select
      className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      value={value}
      onChange={onChange}
      disabled={disabled}
      {...props}
    >
      <option value="" disabled>
        Select
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
  const handleMakeChange = (event) => {
    const selectedMake = event.target.value;
    setMake(selectedMake);
    setModel("");
    setModels(MAKE_MODEL_MAPPING[selectedMake]);
  };

  return (
    <>
      <SelectInput
        options={YEARS}
        value={year}
        onChange={(e) => setYear(e.target.value)}
        data-testid="year-select"
      />
      <SelectInput
        options={MAKES}
        value={make}
        onChange={handleMakeChange}
        data-testid="make-select"
      />
      <SelectInput
        options={models}
        value={model}
        onChange={(e) => setModel(e.target.value)}
        disabled={!models.length}
        data-testid="model-select"
      />
      <button
        onClick={() => fetchData(year, make, model)}
        className="bg-[#832C31] hover:bg-[#42191b] text-white font-bold py-2 px-4 rounded mt-5 block w-full"
        data-testid="fetch-data-button"
      >
        Fetch Data
      </button>
    </>
  );
}
