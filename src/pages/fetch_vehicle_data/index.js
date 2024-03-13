import React from 'react';
import Navigation from '../../components/ui/Navigation';
import CarFetcher from '../../components/cars/CarFetcher';

function FetchVehicleData() {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <CarFetcher />
      
    </div>
  );
}

export default FetchVehicleData;
