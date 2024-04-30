import { useContext } from "react";
import { SessionContext } from "../../context/SessionContext";
import VehicleFetcher from "../../components/vehicles/VehicleFetcher";

function FetchVehicleDataPage() {
  const { session, signIn, isLoading } = useContext(SessionContext);

  if (isLoading) return null;

  if (!session) {
    if (typeof window !== "undefined") {
      signIn();
    }
    return null;
  }

  return <VehicleFetcher />;
}

export default FetchVehicleDataPage;
