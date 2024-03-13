import React from 'react';
import Appbar from '../../components/layout/Navigation';
import Cars from '../../components/cars/Cars';

function App() {
  return (
    <div className="bg-white min-h-screen">
      <Appbar />
      <Cars />
      
    </div>
  );
}

export default App;
