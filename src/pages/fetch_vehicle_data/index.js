import { useSession } from "next-auth/react";
import VehicleFetcher from "../../components/vehicles/VehicleFetcher";

function FetchVehicleDataPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (!session) {
    if (typeof window !== "undefined") {
      window.location.href = "/api/auth/signin";
    }
    return null;
  }

  return <VehicleFetcher />;
}

export default FetchVehicleDataPage;
