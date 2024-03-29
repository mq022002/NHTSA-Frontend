import React, { useState } from "react";
import Image from "next/image";

const VehicleImage = ({ scrapedData }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    scrapedData.imageUrl && (
      <div className="flex justify-center">
        <div
          className="image-hover-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <a
            href={scrapedData.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={scrapedData.imageUrl}
              alt="Car"
              className="max-w-[80%] max-h-[300px] object-cover border-2 border-red-500"
              layout="fill"
              objectFit="cover"
            />
            <div className="image-hover-overlay" />
            {isHovered && (
              <div className="image-hover-text">Click to see cars for sale</div>
            )}
          </a>
        </div>
      </div>
    )
  );
};

export default VehicleImage;
