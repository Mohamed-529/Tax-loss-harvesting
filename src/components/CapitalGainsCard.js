import React from 'react';
import { formatCurrency, calculateNetGain, calculateRealisedGains } from '../utils/calculations';

const CapitalGainsCard = ({ title, gains, isDark = false, savingsMessage = null }) => {
  if (!gains) return null;

  const { stcg, ltcg } = gains;

  const netSTCG = calculateNetGain(stcg.profits, stcg.losses);
  const netLTCG = calculateNetGain(ltcg.profits, ltcg.losses);
  const realisedGains = calculateRealisedGains(netSTCG, netLTCG);

  return (
    <div className={`capital-gains-card ${isDark ? 'card-dark' : 'card-blue'}`}>
      
      <h3 className="card-title">{title}</h3>

      {/* TABLE STRUCTURE */}
      <div className="gains-table">

        {/* HEADER */}
        <div className="row header">
          <div></div>
          <div>Short-Term</div>
          <div>Long-Term</div>
        </div>

        {/* PROFITS */}
        <div className="row">
          <div>Profits</div>
          <div>{formatCurrency(stcg.profits)}</div>
          <div>{formatCurrency(ltcg.profits)}</div>
        </div>

        {/* LOSSES */}
        <div className="row">
          <div>Losses</div>
          <div>{formatCurrency(stcg.losses)}</div>
          <div>{formatCurrency(ltcg.losses)}</div>
        </div>

        {/* NET */}
        <div className="row net">
          <div>Net Gain</div>
          <div>{formatCurrency(netSTCG)}</div>
          <div>{formatCurrency(netLTCG)}</div>
        </div>
      </div>

      {/* TOTAL */}
      <div className="total-section">
        Realised Capital Gains: {formatCurrency(realisedGains)}
      </div>

      {/* SAVINGS */}
      {savingsMessage && (
        <div className="savings-message">
          {savingsMessage}
        </div>
      )}
    </div>
  );
};

export default CapitalGainsCard;