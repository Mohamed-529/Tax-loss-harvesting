import React, { useState, useEffect } from 'react';
import CapitalGainsCard from './components/CapitalGainsCard';
import { fetchHoldings, fetchCapitalGains } from './api/mockApi';
import {
  calculateUpdatedGains,
  calculateNetGain,
  calculateRealisedGains
} from './utils/calculations';
import HoldingsTableWrapper from "./components/HoldingsTableWrapper";
import './App.css';

function App() {

  const [holdings, setHoldings] = useState([]);
  const [baseGains, setBaseGains] = useState(null);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // FETCH DATA
  useEffect(() => {
    const loadData = async () => {
      const [h, g] = await Promise.all([
        fetchHoldings(),
        fetchCapitalGains()
      ]);
      setHoldings(h);
      setBaseGains(g.capitalGains);
    };
    loadData();
  }, []);

  // SELECT LOGIC
  const handleToggleSelect = (coin) => {
    setSelectedCoins(prev =>
      prev.includes(coin)
        ? prev.filter(c => c !== coin)
        : [...prev, coin]
    );
  };

  const handleSelectAll = (coins) => {
    setSelectedCoins(coins);
  };

  // ✅ UPDATED GAINS (MAIN LOGIC)
  const updatedGains = baseGains
    ? calculateUpdatedGains(
        baseGains,
        holdings.filter(h => selectedCoins.includes(h.coin))
      )
    : null;

  // ✅ PRE VALUE
  const pre = baseGains
    ? calculateRealisedGains(
        calculateNetGain(baseGains.stcg.profits, baseGains.stcg.losses),
        calculateNetGain(baseGains.ltcg.profits, baseGains.ltcg.losses)
      )
    : 0;

  // ✅ POST VALUE
  const post = updatedGains
    ? calculateRealisedGains(
        calculateNetGain(updatedGains.stcg.profits, updatedGains.stcg.losses),
        calculateNetGain(updatedGains.ltcg.profits, updatedGains.ltcg.losses)
      )
    : pre;

  const savings = pre - post;

  return (
    <div className="app-container">

      {/* HEADER */}
      <header className="app-header">
        <h1>
  Tax Optimisation

  <span className="tooltip-wrapper">
    <span className="info-link"> How it works ⓘ</span>

    <div className="tooltip-box">
      This tool helps you reduce tax by selecting loss-making assets.
      Negative gains reduce your taxable income while positive gains increase it.
    </div>
  </span>
</h1>
      </header>

      {/* DISCLAIMER FIRST */}
      <section className="info-section">
        <div
          className="accordion-header"
          onClick={() => setShowDisclaimer(!showDisclaimer)}
        >
          <h2>Important Notes & Disclaimer</h2>
          <span>{showDisclaimer ? "▲" : "▼"}</span>
        </div>

        {showDisclaimer && (
          <div className="accordion-content">
            <ul>
              <li> Tax loss harvesting is currently not allowed under Indian tax laws</li>
              
              <li>Applies only to crypto assets.</li><li> Short-term (&lt; 3 years)</li>,
              <li> Long-term (&gt; 3 years)</li>.
              <li>Consult a tax advisor before decisions.</li>
            </ul>
          </div>
        )}
      </section>

      {/* CARDS */}
      <div className="cards-container">

        {/* ✅ PRE */}
        <CapitalGainsCard
          title="Pre-Harvesting"
          gains={baseGains}
          isDark
        />

        {/* ✅ AFTER (IMPORTANT FIX) */}
        <CapitalGainsCard
          title="After Harvesting"
          gains={updatedGains || baseGains}
          savingsMessage={
            savings > 0
              ? `You're going to save ₹${savings.toLocaleString()}`
              : null
          }
        />

      </div>

      {/* TABLE */}
      <div className="table-section">
        <h2>Your Holdings ({holdings.length})</h2>

        <HoldingsTableWrapper
          holdings={holdings}
          selectedCoins={selectedCoins}
          onToggleSelect={handleToggleSelect}
          onSelectAll={handleSelectAll}
        />
      </div>

    </div>
  );
}

export default App;