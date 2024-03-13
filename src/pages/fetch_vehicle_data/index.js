import React from "react";
import BaseLayout from "../../components/layouts/BaseLayout";
import CarFetcher from "../../components/cars/CarFetcher";

function FetchVehicleData() {
  return (
    <BaseLayout>
      <CarFetcher />
    </BaseLayout>
  );
}

export default FetchVehicleData;
