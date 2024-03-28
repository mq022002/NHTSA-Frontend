export function calculateInsuranceRate(msrp, overallRating, frontCrashRating, sideCrashRating, rolloverRating, esc, fcw, ldw, recalls) {
  if (msrp === null || overallRating === null || frontCrashRating === null || sideCrashRating === null || rolloverRating === null || esc === null || fcw === null || ldw === null || recalls === null) {
    return "Cannot calculate insurance rate due to missing data.";
  }

  let baseRate = 500;
  let msrpFactor = msrp > 30000 ? ((msrp - 30000) / 10000) * 0.015 * baseRate : 0;
  let safetyRatingAdjustment = overallRating + frontCrashRating + sideCrashRating + rolloverRating;
  let safetyRatingBonus = (safetyRatingAdjustment - 16) * -50;
  let escBonus = esc === "Standard" ? -25 : 0;
  let fcwBonus = fcw === "Optional" ? -20 : 0;
  let ldwPenalty = ldw === "No" ? 15 : 0;
  let recallPenalty = recalls * 50;
  let minimumRate = 0;
  let totalRate = baseRate + msrpFactor + safetyRatingBonus + escBonus + fcwBonus + ldwPenalty + recallPenalty;
  totalRate = Math.max(totalRate, minimumRate);
  return `Estimated Insurance Rate for 6 Months: $${totalRate.toFixed(2)}`;
}
