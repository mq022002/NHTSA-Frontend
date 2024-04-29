import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../context/SessionContext";
import { useRouter } from "next/router";
import useFetchInsuranceParameters from "../../hooks/useFetchInsuranceParameters";

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === "production";

function AdminPage() {
  const { session } = useContext(SessionContext);
  const router = useRouter();
  const { parameters, isLoading, error, setParameters } =
    useFetchInsuranceParameters();
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    if (isLoading) return;

    if (!isProduction && session) {
      console.log("Logged in user:", session.user);
    }

    if (
      !session ||
      !session.user["cognito:groups"] ||
      !session.user["cognito:groups"].includes("superusers")
    ) {
      if (!isProduction) {
        console.log(
          "User groups:",
          session && session.user
            ? session.user["cognito:groups"]
            : "No session"
        );
      }

      router.push(isProduction ? "/home.html" : "/home");
    }
  }, [session, isLoading, router]);

  useEffect(() => {
    if (parameters) {
      setEditValues(parameters);
    }
  }, [parameters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedValues = Object.keys(parameters).reduce((acc, key) => {
      acc[key] = editValues[key] !== "" ? editValues[key] : parameters[key];
      return acc;
    }, {});

    const updatedValuesAsString = Object.fromEntries(
      Object.entries(updatedValues).map(([key, value]) => [key, String(value)])
    );

    const json = JSON.stringify(updatedValuesAsString);

    if (!isProduction) {
      console.log(json);
    }

    fetch(process.env.NEXT_PUBLIC_POST_ADMIN_CHANGES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Parameters updated successfully");
        setParameters((prev) => ({ ...prev, ...updatedValues }));
        setEditValues(updatedValues);
      })
      .catch((error) => {
        if (!isProduction) {
          console.error("Error updating parameters:", error);
        }
      });
  };

  if (isLoading)
    return (
      <div className="container p-4 mx-auto text-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-xl font-bold text-center">
        Admin Insurance Parameters
      </h1>
      <div className="flex items-center justify-between mb-2 font-bold text-black">
        <span className="w-1/3">Insurance Factor</span>
        <span className="w-1/3 text-center">Current Value</span>
        <span className="w-1/3 text-right">New Value</span>
      </div>
      <hr className="mb-4 border-b-2 border-gray-300" />
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(parameters).map(([key, currentVal]) => (
          <div
            key={key}
            className="flex items-center justify-between space-x-4"
          >
            <label className="w-1/3 font-bold text-black">
              {key.charAt(0).toUpperCase() +
                key.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
            <span className="w-1/3 text-center text-black">{currentVal}</span>
            <input
              type="text"
              name={key}
              placeholder="Enter new value"
              value={editValues[key] || ""}
              onChange={handleChange}
              className="w-1/3 p-2 text-black border-2 border-gray-300 rounded-md"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded hover:bg-red-700 md:w-auto"
        >
          Update Parameters
        </button>
      </form>
    </div>
  );
}

export default AdminPage;
