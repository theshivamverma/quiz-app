export const percentToDegree = (percentage: number) => {
  // Ensure the input percentage is within the range of 0 to 100
  const validPercentage = Math.max(0, Math.min(100, percentage));

  // Convert the percentage to degrees using the provided criteria
  const degrees = ((validPercentage - 50) / 100) * 170;

  return degrees;
}

export const calculatePercentage = (finalScore: number, totalScore: number) => {
  // Calculate the percentage and round it to the nearest integer
  const percentage = Math.round((finalScore / totalScore) * 100);

  return percentage;
}
