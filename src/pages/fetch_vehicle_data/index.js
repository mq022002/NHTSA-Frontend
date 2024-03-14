import React from "react";
import BaseLayout from "../../components/layouts/BaseLayout";
import VehicleFetcher from "../../components/vehicles/VehicleFetcher";

function FetchVehicleData() {
  return (
    <BaseLayout>
      <VehicleFetcher />
    </BaseLayout>
  );
}

export default FetchVehicleData;
