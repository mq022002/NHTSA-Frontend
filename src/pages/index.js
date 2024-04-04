import React, { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    const cards = document.querySelectorAll(".card");

    function handleScroll() {
      const windowCenter = window.innerHeight / 2;

      cards.forEach((card) => {
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

  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <section className="parallax-container text-center pb-52">
        <h1
          className="text-3xl md:text-4xl font-bold"
          style={{
            color: "white",
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
         The Hartford
        </h1>
        <p
          className="mt-4 text-lg"
          style={{
            color: "white",
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
        <div className="pb-16">  
          The Hartford is a leader in property and casualty insurance, group benefits and mutual funds. 
          We are proud to be widely recognized for our customer service excellence, sustainability practices, 
          trust and integrity.
        </div>  
        </p>
      </section>

      <section className="buffer"></section>

      <section className="parallax-container parallax-container2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
      <div className="card p-2 flex flex-col justify-between h-full">
    <div>
      <div className="card-img bg-cover bg-center h-48"></div>
      <h3 className="text-xl font-bold mt-4">Fetch Data</h3>
      <div className="content-center h-20 pb-2">
        <p>
          Get a calculated insurance rate for your car.
        </p>
      </div>
    </div>
    <div className="mt-auto pb-14">
      <a href="#" className="inline-block px-4 py-2 rounded-lg bg-gray-800 text-white font-bold">Learn more</a>
    </div>
  </div>

  <div className="card p-2 h-full">
    <div className="card-img bg-cover bg-center h-48"></div>
    <h3 className="text-xl font-bold mt-4">About</h3>
    <div className="content-center h-20 pb-2">
      <p>
        Learn more about our team, Team MAHA.
      </p>
    </div>
    <div className="mt-auto pb-14">
      <a href="#" className="inline-block px-4 py-2 rounded-lg bg-gray-800 text-white font-bold">Learn more</a>
    </div>
        </div>

        <div className="card p-2 flex flex-col justify-between h-full">
          <div>
            <div className="card-img bg-cover bg-center h-48"></div>
            <h3 className="text-xl font-bold mt-4">User Reviews</h3>
            <div className="content-center h-20 pb-2">
              <p>
                Take a look at what users think about our website.
              </p>
            </div>
          </div>
          <div className="mt-auto pb-14">
            <a href="#" className="inline-block px-4 py-2 rounded-lg bg-gray-800 text-white font-bold">Learn more</a>
          </div>
        </div>

        <div className="card p-2 flex flex-col justify-between h-full">
          <div>
            <div className="card-img bg-cover bg-center h-48"></div>
            <h3 className="text-xl font-bold mt-4">IDK yet</h3>
            <div className="content-center h-20 pb-2">
              <p>
                Get lift off from the mountain and enjoy through the splendor of the surrounding landscape by parachute.
              </p>
            </div>
          </div>
          <div className="mt-auto pb-14">
            <a href="#" className="inline-block px-4 py-2 rounded-lg bg-gray-800 text-white font-bold">Learn more</a>
          </div>
        </div>
      </section>

      <section className="buffer"></section>
    </div>
  );
}

export default HomePage;
