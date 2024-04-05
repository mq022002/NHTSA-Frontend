import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useSession } from "next-auth/react";

function HomePage() {
  const { data: session } = useSession();
  
  useEffect(() => {
    const cards = document.querySelectorAll(".card");

    function handleScroll() {
      const windowCenter = window.innerHeight / 2;

      cards.forEach((card) => {
        if (card.id === "review-card") {
          return; 
        }
        const bounding = card.getBoundingClientRect();
        const cardCenter = bounding.top + bounding.height / 2;
        let opacity;

        if (cardCenter <= windowCenter) {
          opacity = 1; // Fully solid when the card is above or at the window center
        } else {
          const distanceToCenter = Math.abs(cardCenter - windowCenter);
          opacity = 1 - distanceToCenter / windowCenter;
        }

        card.style.opacity = opacity;
      });
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  const [reviews, setReviews] = useState([]);
  

  useEffect(() => {
    // Fetch user reviews from the API 
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

  const [newReview, setNewReview] = useState({
    stars: 0,
    reviewContent: '',
  });

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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) throw new Error('Failed to submit review');
      alert('Review submitted successfully');
      e.target.reset(); 
      setReviews([...reviews, reviewData]); 
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review. Please try again.');
    }
    setNewReview({ stars: 0, reviewContent: '' });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
    <section className="text-center parallax-container pb-52">
        <h1
          className="text-3xl font-bold md:text-4xl"
          style={{
            color: "white",
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
          The Hartford
        </h1>
        <div
          className="mt-4 text-lg"
          style={{
            color: "white",
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
          <div className="pb-16">
            The Hartford is a leader in property and casualty insurance, group
            benefits and mutual funds. We are proud to be widely recognized for
            our customer service excellence, sustainability practices, trust and
            integrity.
          </div>
        </div>
      </section>

      <section className="buffer"></section>

      <section className="grid grid-cols-1 gap-6 py-12 parallax-container parallax-container2 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col justify-between h-full p-2 card">
          <div>
            <div className="h-48 bg-center bg-cover card-img"></div>
            <h3 className="mt-4 text-xl font-bold">Fetch Data</h3>
            <div className="content-center h-20 pb-2">
              <p>Get a calculated insurance rate for your car.</p>
            </div>
          </div>
          <div className="mt-auto pb-14">
            <a
              href="#"
              className="inline-block px-4 py-2 font-bold text-white bg-gray-800 rounded-lg"
            >
              Learn more
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between h-full p-2 card">
          <div className="h-48 bg-center bg-cover card-img"></div>
          <h3 className="mt-4 text-xl font-bold">About</h3>
          <div className="content-center h-20 pb-2">
            <p>Learn more about our team, Team MAHA.</p>
          </div>
          <div className="mt-auto pb-14">
            <a
              href="#"
              className="inline-block px-4 py-2 font-bold text-white bg-gray-800 rounded-lg"
            >
              Learn more
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between h-full p-2 card">
          <div>
            <div className="h-48 bg-center bg-cover card-img"></div>
            <h3 className="mt-4 text-xl font-bold">TBD</h3>
            <div className="content-center h-20 pb-2">
              <p></p>
            </div>
          </div>
          <div className="mt-auto pb-14">
            <a
              href="#"
              className="inline-block px-4 py-2 font-bold text-white bg-gray-800 rounded-lg"
            >
              Learn more
            </a>
          </div>
        </div>
        </section>

        <section className="buffer"></section>

        
      <section className="parallax-container3 w-full flex justify-center items-center mt-10">
        <div className="w-9/10 max-w-5xl">
          {/* Header */}
          <h3 className="text-xl font-bold text-center bg-black text-white p-2">
            User Reviews
          </h3>

          {/* Reviews Card */}
          <div className="review-card overflow-auto border-x border-y-0" style={{ maxHeight: "65vh" }}>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="mb-4 p-4">
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
              <p className="text-center py-4">No reviews yet.</p>
            )}
          </div>

          {/* Submission Form */}
          <form onSubmit={handleSubmit} className="bg-black p-2 mt-4">
            <div className="text-center mb-2">
    
              <ReactStars
                count={5}
                onChange={handleRatingChange}
                size={24}
                activeColor="#ffd700"
                value={newReview.stars}
              />
            </div>
            <div className="text-center mb-2">
              <label htmlFor="reviewContent">Submit Your Own Review Below:</label>
              <textarea
                id="reviewContent"
                name="reviewContent"
                value={newReview.reviewContent}
                onChange={(e) => setNewReview({ ...newReview, reviewContent: e.target.value })}
                required
                className="w-full min-h-[100px] p-2"
                style={{ color: 'black' }}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="px-4 py-2 font-bold text-white bg-gray-800 rounded-lg">
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default HomePage;