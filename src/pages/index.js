import Image from "next/image";
import React, {useState, useEffect } from 'react';
import Link from 'next/link';

const calculateAverageReviews = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce((acc, review) => acc + review.stars, 0);
  return total / reviews.length;
};

const renderStars = (rating) => {
  const roundedRating = Math.round(rating);
  return '★'.repeat(roundedRating) + '☆'.repeat(5 - roundedRating);
};

function HomePage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_FETCH_REVIEWS); 
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] p-0 m-0">
      <div className="flex flex-row items-start justify-center w-full p-4">
        <div className="text-black max-w-md">
          <p className="text-4xl font-bold underline">
            MAHA Insurance Calculator
          </p>
          <p>
            We&apos;ll get you where you want to go, with rates that keep you moving forward
          </p>
          <div className="mt-4 border border-gray-300 rounded-lg p-4">
            <p className="text-sm text-black">Average User Rating:</p>
            <p className="text-xl font-bold text-black">
              {calculateAverageReviews(reviews).toFixed(1)} {renderStars(calculateAverageReviews(reviews))}
            </p>
            <hr className="my-4 border-gray-300" />
            <p className="text-sm text-black">Let Us Know What You Think!</p>
            <div className="mt-2">
              <Link href="/user_reviews" legacyBehavior>
                <a className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out">
                  Click Here
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-auto max-w-md p-4">
          <Image
            src="/Navigator.svg"
            alt="car driving to checkpoint"
            layout="responsive"
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
