export function getLowestDevicePrice(device) {
  if (!device?.prices?.length) return Number.POSITIVE_INFINITY;

  return Math.min(...device.prices.map((priceRow) => Number(priceRow.price) || Number.POSITIVE_INFINITY));
}

export function getBudgetRange(wizardAnswers) {
  const budget = wizardAnswers?.[2];

  if (!Array.isArray(budget) || budget.length !== 2) return null;

  const [min, max] = budget.map(Number);
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;

  return [Math.min(min, max), Math.max(min, max)];
}

export function pickBestDevice({ devices, preferredBrands = [], budgetRange = null }) {
  const brandCandidates = preferredBrands.length > 0
    ? devices.filter((device) => preferredBrands.includes(device.brand))
    : devices;
  let candidates = brandCandidates.length > 0 ? brandCandidates : devices;

  if (budgetRange) {
    const [minBudget, maxBudget] = budgetRange;
    const isInBudget = (device) => {
      const lowestPrice = getLowestDevicePrice(device);
      return lowestPrice >= minBudget && lowestPrice <= maxBudget;
    };
    const budgetMatches = candidates.filter(isInBudget);

    if (budgetMatches.length > 0) candidates = budgetMatches;
    else {
      const allBudgetMatches = devices.filter(isInBudget);
      if (allBudgetMatches.length > 0) candidates = allBudgetMatches;
    }
  }

  return [...candidates].sort((a, b) => {
    const scoreDifference = b.matchScore - a.matchScore;
    if (scoreDifference !== 0) return scoreDifference;

    return getLowestDevicePrice(a) - getLowestDevicePrice(b);
  })[0] || devices[0];
}

export function formatBudgetRange(budgetRange) {
  if (!budgetRange) return "Any budget";

  const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return `${formatINR(budgetRange[0])} - ${formatINR(budgetRange[1])}`;
}
