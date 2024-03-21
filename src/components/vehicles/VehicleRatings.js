const RatingField = ({ label, value }) => (
  <p className="text-sm">
    {label}: {value}
  </p>
);

const RatingInfoBox = ({ ratingField }) => (
  <div className="border border-gray-300 rounded p-4 my-2">
    <h2 className="text-lg font-semibold">
      Vehicle: {ratingField.VehicleDescription}
    </h2>
    <RatingField label="Overall Rating" value={ratingField.OverallRating} />
    <RatingField
      label="Front Crash Rating"
      value={ratingField.OverallFrontCrashRating}
    />
    <RatingField
      label="Side Crash Rating"
      value={ratingField.OverallSideCrashRating}
    />
    <RatingField label="Rollover Rating" value={ratingField.RolloverRating} />
    <RatingField
      label="Electronic Stability Control"
      value={ratingField.NHTSAElectronicStabilityControl}
    />
    <RatingField
      label="Forward Collision Warning"
      value={ratingField.NHTSAForwardCollisionWarning}
    />
    <RatingField
      label="Lane Departure Warning"
      value={ratingField.NHTSALaneDepartureWarning}
    />
  </div>
);

const VehicleRatings = ({ ratings }) => (
  <div className="w-1/2 pr-2">
    <h2 className="text-lg font-semibold">Rating Information</h2>
    {ratings.map((ratingField, index) => (
      <RatingInfoBox key={index} ratingField={ratingField} />
    ))}
  </div>
);

export default VehicleRatings;
