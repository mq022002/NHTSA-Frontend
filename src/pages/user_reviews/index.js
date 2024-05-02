import UserReviews from "../../components/UserReviews";
import React, { useEffect, useState, useContext } from "react";
import { SessionContext } from "../../context/SessionContext";

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === "production";

function UserReviewsPage() {
  const { session } = useContext(SessionContext);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    stars: 0,
    reviewContent: "",
  });

  useEffect(() => {
    // Fetch user reviews from the API
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
  }, []);

  const handleRatingChange = (newRating) => {
    setNewReview({ ...newReview, stars: newRating });
  };

  // Review submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      alert("You must be logged in to submit a review.");
      return;
    }

    const reviewData = {
      username: session.user.name,
      reviewContent: newReview.reviewContent,
      stars: newReview.stars,
      datePosted: new Date().toISOString().slice(0, 10),
    };

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SUBMIT_REVIEW, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) throw new Error("Failed to submit review");
      alert("Review submitted successfully");
      e.target.reset();
      setReviews([...reviews, reviewData]);
    } catch (error) {
      if (!isProduction) {
        console.error("Failed to submit review:", error);
      }
      alert("Failed to submit review. Please try again.");
    }
    setNewReview({ stars: 0, reviewContent: "" });
  };
  return (
    <div className="flex justify-center w-full">
      <UserReviews
        reviews={reviews}
        newReview={newReview}
        handleRatingChange={handleRatingChange}
        handleSubmit={handleSubmit}
        setNewReview={setNewReview}
      />
    </div>
  );
}

export default UserReviewsPage;
