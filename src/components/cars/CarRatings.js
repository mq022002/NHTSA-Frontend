const RatingInfoBox = ({ ratingItem }) => (
  <div className="border border-gray-300 rounded p-4 my-2">
    <h2 className="text-lg font-semibold">
      Vehicle: {ratingItem.VehicleDescription}
    </h2>
    <p className="text-base">Overall Rating: {ratingItem.OverallRating}</p>
    <p className="text-sm">
      Front Crash Rating: {ratingItem.OverallFrontCrashRating}
    </p>
    <p className="text-sm">
      Side Crash Rating: {ratingItem.OverallSideCrashRating}
    </p>
    <p className="text-sm">Rollover Rating: {ratingItem.RolloverRating}</p>
    <p className="text-sm">
      Electronic Stability Control: {ratingItem.NHTSAElectronicStabilityControl}
    </p>
    <p className="text-sm">
      Forward Collision Warning: {ratingItem.NHTSAForwardCollisionWarning}
    </p>
    <p className="text-sm">
      Lane Departure Warning: {ratingItem.NHTSALaneDepartureWarning}
    </p>
  </div>
);

const CarRatings = ({ ratings }) => (
  <div className="w-1/2 pr-2">
    <h2 className="text-lg font-semibold">Rating Information</h2>
    {ratings.map((ratingItem, index) => (
      <RatingInfoBox key={index} ratingItem={ratingItem} />
    ))}
  </div>
);

export default CarRatings;
