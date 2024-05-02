/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";

const calculateAverageReviews = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce((acc, review) => acc + review.stars, 0);
  return total / reviews.length;
};

const renderStars = (rating) => {
  const roundedRating = Math.round(rating);
  return "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating);
};

function HomePage() {
  const [reviews, setReviews] = useState([]);
  const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === "production";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_FETCH_REVIEWS);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        if (!isProduction) {
          console.error(error);
        }
      }
    };

    fetchReviews();
  }, [isProduction]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-center h-[calc(100vh-100px)] p-0 m-0">
        <div className="mr-4 text-black">
          <p className="text-4xl font-bold underline">
            MAHA Insurance Calculator
          </p>
          <p>
            We&apos;ll get you where you want to go, with rates that keep you
            moving forward!
          </p>
          <div className="pr-4 mt-5 mr-3">
            <p className="text-black">
              Average User Rating: {calculateAverageReviews(reviews).toFixed(1)}
              {renderStars(calculateAverageReviews(reviews))}
            </p>
          </div>
          <div className="mt-2">
            <Link
              href={isProduction ? "/user_reviews.html" : "/user_reviews"}
              legacyBehavior
            >
              <a className="text-sm px-4 py-2 text-white transition duration-150 ease-in-out bg-[#832C31] rounded hover:bg-[#832C31]">
                Leave us a review here!
              </a>
            </Link>
          </div>
        </div>
        <div className="w-full h-auto md:w-1/2">
          <img
            src="/Navigator.svg"
            alt="car driving to checkpoint"
            className="object-cover object-center w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
