
import React, { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    


    function handleScroll() {
      const windowCenter = window.innerHeight / 2;

      cards.forEach(card => {
        const bounding = card.getBoundingClientRect();
        const cardCenter = bounding.top + bounding.height / 2;
        let opacity;

        if (cardCenter <= windowCenter) {
          opacity = 1; // Fully solid when the card is above or at the window center
        } else {
          const distanceToCenter = Math.abs(cardCenter - windowCenter);
          opacity = 1 - (distanceToCenter / windowCenter);
        }

        card.style.opacity = opacity;
      });
  
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);




  return (
    <div className="min-h-screen">
    <section className="parallax-container">
      <h1 className="text-3xl md:text-4xl font-bold" style={{color: "white", textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"}}>Cerro Torre</h1>
      <p className="mt-4 text-lg" style={{color: "white", textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"}}>
  Cerro Torre is a mountain of sheer beauty whose spectacular attributes make it a unique gem in Argentina.
</p>


    </section>

    <section className="buffer"></section>

    <section className="parallax-container parallax-container2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">


      <div className="card">
        <div className="card-img bg-cover bg-center h-48"></div>
        <h3 className="text-xl font-bold mt-4">Hiking</h3>
        <p className="mt-2">
          Explore the myriad of trails through the mountainous. Choose the difficulty appropriate to your fitness level.
        </p>
        <a href="#" className="mt-4 inline-block px-4 py-2 rounded-lg bg-gray-800 text-white font-bold">Learn more</a>
      </div>
      <div className="card">
        <div className="card-img bg-cover bg-center h-48"></div>
        <h3 className="text-xl font-bold mt-4">Rock climbing</h3>
        <p className="mt-2">
          The goal is to reach the summit of a formation or the endpoint of a usually pre-defined route without falling.
        </p>
        <a href="#" className="mt-4 inline-block px-4 py-2 rounded-lg bg-gray-800 text-white font-bold">Learn more</a>
      </div>
      <div className="card">
        <div className="card-img bg-cover bg-center h-48"></div>
        <h3 className="text-xl font-bold mt-4">Caving</h3>
        <p className="mt-2">
          Exploring underground through networks of tunnels and passageways, which can be natural or artificial.
        </p>
        <a href="#" className="mt-4 inline-block px-4 py-2 rounded-lg bg-gray-800 text-white font-bold">Learn more</a>
      </div>
      <div className="card">
        <div className="card-img bg-cover bg-center h-48"></div>
        <h3 className="text-xl font-bold mt-4">Paragliding</h3>
        <p className="mt-2">
          Get lift off from the mountain and enjoy through the splendor of the surrounding landscape by parachute.
        </p>
        <a href="#" className="mt-4 inline-block px-4 py-2 rounded-lg bg-gray-800 text-white font-bold">Learn more</a>
      </div>
     
    </section>

    <section className="buffer"></section>
  </div>

);
}

export default HomePage;