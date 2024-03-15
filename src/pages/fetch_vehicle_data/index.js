import React from "react";
import BaseLayout from "../../components/layouts/BaseLayout";
import VehicleFetcher from "../../components/vehicles/VehicleFetcher";

function FetchVehicleDataPage() {
  return (
    <BaseLayout>
      <VehicleFetcher />
    </BaseLayout>
  );
}

export default FetchVehicleDataPage;
