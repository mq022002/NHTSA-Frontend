import { useState, useEffect } from "react";

const useFetchInsuranceParameters = () => {
  const [parameters, setParameters] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isProduction = process.env.NODE_ENV === "production";

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_FETCH_INSURANCE_CALCULATIONS)
      .then((response) => response.json())
      .then((data) => {
        const { id, ...rest } = data;
        const parameters = Object.fromEntries(
          Object.entries(rest).map(([key, value]) => [key, parseFloat(value)])
        );
        setParameters(parameters);
        if (!isProduction) {
          console.log(parameters);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [isProduction]);

  return { parameters, isLoading, error, setParameters };
};

export default useFetchInsuranceParameters;
