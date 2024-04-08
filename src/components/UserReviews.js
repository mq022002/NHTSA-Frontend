// UserReviews.js
import React from "react";
import ReactStars from "react-rating-stars-component";

const UserReviews = ({
  reviews,
  newReview,
  handleRatingChange,
  handleSubmit,
}) => {
  return (
    <div className="max-w-5xl w-9/10">
      {/* Header */}
      <h3 className="p-2 text-xl font-bold text-center text-white bg-black">
        User Reviews
      </h3>

      {/* Reviews Card */}
      <div
        className="overflow-auto review-card border-x border-y-0"
        style={{ maxHeight: "65vh" }}
      >
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="p-4 mb-4">
              <p className="font-bold">{review.username}</p>
              <ReactStars
                value={review.stars}
                edit={false}
                size={24}
                activeColor="#ffd700"
              />
              <p>{review.reviewContent}</p>
              <p className="text-sm">{review.datePosted}</p>
            </div>
          ))
        ) : (
          <p className="py-4 text-center">No reviews yet.</p>
        )}
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="p-2 mt-4 bg-black">
        <div className="mb-2 text-center">
          <ReactStars
            count={5}
            onChange={handleRatingChange}
            size={24}
            activeColor="#ffd700"
            value={newReview.stars}
          />
        </div>
        <div className="mb-2 text-center">
          <label htmlFor="reviewContent">Submit Your Own Review Below:</label>
          <textarea
            id="reviewContent"
            name="reviewContent"
            value={newReview.reviewContent}
            onChange={(e) =>
              setNewReview({ ...newReview, reviewContent: e.target.value })
            }
            required
            className="w-full min-h-[100px] p-2"
            style={{ color: "black" }}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-gray-800 rounded-lg"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserReviews;
