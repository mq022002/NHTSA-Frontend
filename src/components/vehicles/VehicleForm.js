import React, { useState } from "react";
import { YEARS, MAKES, MAKE_MODEL_MAPPING } from "../../constants/constants";
import SelectInput from "../ui/SelectInput";

export default function VehicleForm({ fetchData }) {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [models, setModels] = useState([]);

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
      />
      <SelectInput options={MAKES} value={make} onChange={handleMakeChange} />
      <SelectInput
        options={models}
        value={model}
        onChange={(e) => setModel(e.target.value)}
        disabled={!models.length}
      />
      <button
        onClick={() => fetchData(year, make, model)}
        className="bg-[#832C31] hover:bg-[#42191b] text-white font-bold py-2 px-4 rounded mt-5 block w-full"
      >
        Fetch Data
      </button>
    </>
  );
}
