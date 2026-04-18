// Utility functions for tax loss harvesting calculations

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};
  export const formatCompactNumber = (value) => {
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(2) + "M";
  if (value >= 1_000) return (value / 1_000).toFixed(2) + "K";
  return value.toFixed(2);
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(value);
};

export const calculateNetGain = (profits, losses) => {
  return profits - losses;
};

export const calculateRealisedGains = (netSTCG, netLTCG) => {
  return netSTCG + netLTCG;
};

// Calculate updated capital gains after selecting holdings
export const calculateUpdatedGains = (baseGains, selectedHoldings) => {
  let updatedSTCGProfits = baseGains.stcg.profits;
  let updatedSTCGLosses = baseGains.stcg.losses;
  let updatedLTCGProfits = baseGains.ltcg.profits;
  let updatedLTCGLosses = baseGains.ltcg.losses;

  selectedHoldings.forEach((holding) => {
    // Add STCG gain to profits (if positive) or losses (if negative)
    if (holding.stcg.gain >= 0) {
      updatedSTCGProfits += holding.stcg.gain;
    } else {
      updatedSTCGLosses += Math.abs(holding.stcg.gain);
    }

    // Add LTCG gain to profits (if positive) or losses (if negative)
    if (holding.ltcg.gain >= 0) {
      updatedLTCGProfits += holding.ltcg.gain;
    } else {
      updatedLTCGLosses += Math.abs(holding.ltcg.gain);
    }
  });





  return {
    stcg: {
      profits: updatedSTCGProfits,
      losses: updatedSTCGLosses
    },
    ltcg: {
      profits: updatedLTCGProfits,
      losses: updatedLTCGLosses
    }
  };
};
