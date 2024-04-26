import React, { useState, useEffect } from 'react';

function AdminPage() {
  const [parameters, setParameters] = useState({
    baseRate: '',
    msrpThreshold: '',
    msrpFactor: '',
    minSafetyRating: '',
    safetyRatingMultiplier: '',
    escBonus: '',
    fcwBonus: '',
    ldwPenalty: '',
    recallPenalty: ''
  });
  const [editValues, setEditValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.FETCH_INSURANCE_CALCULATIONS)
      .then(response => response.json())
      .then(data => {
        const { id, ...rest } = data;
        setParameters(rest);
        const initialEditValues = Object.keys(rest).reduce((acc, key) => ({ ...acc, [key]: '' }), {});
        setEditValues(initialEditValues);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching parameters:', error);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedValues = Object.keys(parameters).reduce((acc, key) => {
      
      acc[key] = editValues[key] !== '' ? editValues[key] : parameters[key];
      return acc;
    }, {});

    fetch(process.env.POST_ADMIN_CHANGES , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedValues)
    })
    .then(response => response.json())
    .then(data => {
      alert('Parameters updated successfully');
      setParameters(updatedValues); 
      setEditValues({}); 
    })
    .catch(error => {
      console.error('Error updating parameters:', error);
    });
  };

  if (isLoading) return <div className="container mx-auto text-center p-4"><p>Loading...</p></div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-xl font-bold mb-4">Admin Insurance Parameters</h1>
      <div className="flex justify-between items-center mb-2 font-bold text-black">
        <span className="w-1/3">Insurance Factor</span>
        <span className="w-1/3 text-center">Current Value</span>
        <span className="w-1/3 text-right">New Value</span>
      </div>
      <hr className="border-b-2 border-gray-300 mb-4"/>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(parameters).map(([key, currentVal]) => (
          <div key={key} className="flex justify-between items-center space-x-4">
            <label className="w-1/3 text-black font-bold">
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <span className="w-1/3 text-center text-black">{currentVal}</span>
            <input
              type="text"
              name={key}
              placeholder="Enter new value"
              value={editValues[key] || ''}  
              onChange={handleChange}
              className="text-black border-gray-300 border-2 rounded-md p-2 w-1/3"
            />
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
        >
          Update Parameters
        </button>
      </form>
    </div>
  );
}

export default AdminPage;
