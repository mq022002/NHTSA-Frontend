import { getSession } from "next-auth/react";
import VehicleFetcher from "../../components/vehicles/VehicleFetcher";

function FetchVehicleDataPage() {
  return <VehicleFetcher />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default FetchVehicleDataPage;
