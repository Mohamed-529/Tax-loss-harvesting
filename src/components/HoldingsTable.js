import React, { useState } from 'react';
import { formatCurrency, formatCompactNumber } from '../utils/calculations';

const HoldingsTable = ({ holdings, selectedCoins, onToggleSelect, onSelectAll }) => {

  const [sortKey, setSortKey] = useState(null);
  const [order, setOrder] = useState("asc");

  
  const handleSort = (key) => {
    if (sortKey === key) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setOrder("asc");
    }
  };

  
  const sortedHoldings = [...holdings].sort((a, b) => {
    if (!sortKey) return 0;

    let valA = sortKey === "stcg" ? a.stcg.gain : a.ltcg.gain;
    let valB = sortKey === "stcg" ? b.stcg.gain : b.ltcg.gain;

    return order === "asc" ? valA - valB : valB - valA;
  });


  const handleHeaderClick = () => {
    if (selectedCoins.length > 0) {
      onSelectAll([]); // remove all
    } else {
      onSelectAll(sortedHoldings.map(h => h.coin)); // select all
    }
  };

  return (
    <div className="holdings-table-container">
      <table className="holdings-table">

        {/* ================= HEADER ================= */}
        <thead>
          <tr>
            <th onClick={handleHeaderClick} style={{ cursor: "pointer" }}>
              {selectedCoins.length > 0 ? "−" : "□"}
            </th>

            <th>Asset</th>
            <th>Holdings</th>
            <th>Current Price</th>

            <th onClick={() => handleSort("stcg")} style={{ cursor: "pointer" }}>
              STCG {sortKey === "stcg" ? (order === "asc" ? "↑" : "↓") : ""}
            </th>

            <th onClick={() => handleSort("ltcg")} style={{ cursor: "pointer" }}>
              LTCG {sortKey === "ltcg" ? (order === "asc" ? "↑" : "↓") : ""}
            </th>

            <th>Amount to Sell</th>
          </tr>
        </thead>

        {/* ================= BODY ================= */}
        <tbody>
          {sortedHoldings.map((holding, index) => {
            const isSelected = selectedCoins.includes(holding.coin);

            return (
              <tr key={index} className={isSelected ? 'selected' : ''}>

                {/*  Checkbox */}
                <td>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(holding.coin)}
                  />
                </td>

                {/* Asset (Logo + Name + Symbol) */}
                <td>
                  <div className="asset-info">
                    <img
                      src={holding.logo}
                      alt={holding.coinName}
                      className="coin-logo"
                      onError={(e) => {
                        e.target.src =
                          "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg";
                      }}
                    />
                    <div>
                      <div>{holding.coinName}</div>
                      <div style={{ fontSize: "12px", color: "#8b949e" }}>
                        {holding.coin}
                      </div>
                    </div>
                  </div>
                </td>

                {/*  Holdings + Avg Buy Price */}
                <td title={holding.totalHolding}>
                  <div>{formatCompactNumber(holding.totalHolding)}</div>
                  <div style={{ fontSize: "12px", color: "#8b949e" }}>
                    {formatCurrency(holding.averageBuyPrice)}
                  </div>
                </td>

                {/*  Current Price */}
                <td title={holding.currentPrice}>
                  {formatCurrency(holding.currentPrice)}
                </td>

                {/*  STCG */}
                <td
                  title={holding.stcg.gain}
                  className={holding.stcg.gain >= 0 ? 'gain-positive' : 'gain-negative'}
                >
                  {formatCompactNumber(holding.stcg.gain)}
                </td>

                {/*  LTCG */}
                <td
                  title={holding.ltcg.gain}
                  className={holding.ltcg.gain >= 0 ? 'gain-positive' : 'gain-negative'}
                >
                  {formatCompactNumber(holding.ltcg.gain)}
                </td>

                {/*  Amount to Sell */}
                <td>
                  {isSelected ? formatCompactNumber(holding.totalHolding) : '-'}
                </td>

              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
};

export default HoldingsTable;
