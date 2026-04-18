import React, { useState } from "react";
import HoldingsTable from "./HoldingsTable";

const HoldingsTableWrapper = ({ holdings, selectedCoins, onToggleSelect, onSelectAll }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleData = showAll ? holdings : holdings.slice(0, 4);

  return (
    <div>
      <HoldingsTable
        holdings={visibleData}
        selectedCoins={selectedCoins}
        onToggleSelect={onToggleSelect}
        onSelectAll={onSelectAll}
      />

      {!showAll && holdings.length > 4 && (
        <button onClick={() => setShowAll(true)}>
          View All
        </button>
      )}
    </div>
  );
};

export default HoldingsTableWrapper;