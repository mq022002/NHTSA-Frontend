import React from 'react';
import Navigation from '../../components/layout/Navigation';
import CarFetcher from '../../components/cars/CarFetcher';

function App() {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <CarFetcher />
      
    </div>
  );
}

export default App;
