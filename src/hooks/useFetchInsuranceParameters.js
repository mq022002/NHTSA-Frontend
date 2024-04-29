import { useState, useEffect } from "react";

const useFetchInsuranceParameters = () => {
  const [parameters, setParameters] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_FETCH_INSURANCE_CALCULATIONS)
      .then((response) => response.json())
      .then((data) => {
        const { id, ...rest } = data;
        setParameters(rest);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return { parameters, isLoading, error, setParameters };
};

export default useFetchInsuranceParameters;
