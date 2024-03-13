import React, { useState } from "react";

export default function CarForm({ fetchData }) {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [models, setModels] = useState([]);
  const years = [2017, 2018, 2019, 2020, 2021, 2022];
  const makes = ["Honda", "BMW", "Toyota", "Ford", "Audi"];

  const makeModelMapping = {
    Honda: ["Civic", "Accord", "Pilot"],
    BMW: ["X5", "X3", "M3"],
    Toyota: ["Corolla", "Camry", "RAV4"],
    Ford: ["F-150", "Taurus", "Mustang"],
    Audi: ["A5", "A6", "RS5"],
  };

  const handleMakeChange = (event) => {
    const selectedMake = event.target.value;
    setMake(selectedMake);
    setModel("");
    setModels(makeModelMapping[selectedMake]);
  };

  return (
    <>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="" disabled>
          Select Year
        </option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={make}
        onChange={handleMakeChange}
      >
        <option value="" disabled>
          Select Make
        </option>
        {makes.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        disabled={!models.length}
      >
        <option value="" disabled>
          Select Model
        </option>
        {models.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <button
        onClick={() => fetchData(year, make, model)}
        className="bg-[#832C31] hover:bg-[#42191b] text-white font-bold py-2 px-4 rounded mt-5 block w-full"
      >
        Fetch Data
      </button>
    </>
  );
}
