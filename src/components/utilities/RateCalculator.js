export function calculateInsuranceRate(
  msrp,
  overallRating,
  frontCrashRating,
  sideCrashRating,
  rolloverRating,
  esc,
  fcw,
  ldw,
  recalls,
  insuranceParameters
) {
  if (
    msrp === null ||
    overallRating === null ||
    frontCrashRating === null ||
    sideCrashRating === null ||
    rolloverRating === null ||
    esc === null ||
    fcw === null ||
    ldw === null ||
    recalls === null
  ) {
    return "Cannot calculate insurance rate due to missing data.";
  }

  let baseRate = insuranceParameters.baseRate;
  let msrpFactor =
    msrp > insuranceParameters.msrpThreshold
      ? ((msrp - insuranceParameters.msrpThreshold) / 10000) *
        insuranceParameters.msrpFactor *
        baseRate
      : 0;
  let safetyRatingAdjustment =
    overallRating + frontCrashRating + sideCrashRating + rolloverRating;
  let safetyRatingBonus =
    (safetyRatingAdjustment - insuranceParameters.minSafetyRating) *
    -insuranceParameters.safetyRatingMultiplier;
  let escBonus = esc === "Standard" ? insuranceParameters.escBonus : 0;
  let fcwBonus = fcw === "Optional" ? insuranceParameters.fcwBonus : 0;
  let ldwPenalty = ldw === "No" ? insuranceParameters.ldwPenalty : 0;
  let recallPenalty = recalls * insuranceParameters.recallPenalty;
  let minimumRate = 0;
  let totalRate =
    baseRate +
    msrpFactor +
    safetyRatingBonus +
    escBonus +
    fcwBonus +
    ldwPenalty +
    recallPenalty;
  totalRate = Math.max(totalRate, minimumRate);
  return `Estimated Insurance Rate for 6 Months: $${totalRate.toFixed(2)}`;
}
