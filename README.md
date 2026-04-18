# KoinX - Tax Loss Harvesting Tool

A React-based tax loss harvesting interface that helps users optimize their crypto tax liability by visualizing capital gains before and after selecting holdings to harvest.

## Features

- **Pre-Harvesting Card**: Displays current capital gains (short-term and long-term) with profits, losses, and net realised gains
- **After Harvesting Card**: Dynamically updates based on selected holdings, showing potential tax savings
- **Holdings Table**: Interactive table with selectable rows to simulate harvesting different assets
- **Real-time Calculations**: Instant updates to capital gains as you select/deselect holdings
- **Savings Indicator**: Shows how much you'll save in taxes when post-harvest gains are lower
- **Responsive Design**: Works on desktop and mobile devices
- **Loading & Error States**: Proper handling of async data loading
- **Select All/Deselect All**: Bulk selection functionality in table header

## Tech Stack

- **React** (v18+) - Frontend framework
- **Plain CSS** - Custom styling without frameworks
- **Mock APIs** - Simulated async API calls with promises

## Project Structure

```
src/
├── api/
│   └── mockApi.js          # Mock API data and fetch functions
├── components/
│   ├── CapitalGainsCard.js # Pre/Post harvesting display cards
│   └── HoldingsTable.js    # Selectable holdings table
├── utils/
│   └── calculations.js     # Tax calculation utilities
├── App.js                  # Main application component
├── App.css                 # Application styles
└── index.js                # Entry point
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd tax-loss-harvesting
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## How It Works

### Tax Loss Harvesting Logic

1. **Initial State**: Fetches capital gains data showing current STCG (Short-Term Capital Gains) and LTCG (Long-Term Capital Gains)

2. **Selection Impact**: When you select a holding:
   - If gain is positive → adds to profits (realizing that gain)
   - If gain is negative → adds to losses (harvesting that loss)

3. **Calculations**:
   ```
   Net STCG = STCG Profits - STCG Losses
   Net LTCG = LTCG Profits - LTCG Losses
   Realised Gains = Net STCG + Net LTCG
   ```

4. **Savings Display**: Shows savings message only when:
   ```
   Pre-Harvest Realised Gains > Post-Harvest Realised Gains
   ```

## Assumptions

1. Holdings are sorted in their original API order
2. All holdings are treated as INR-denominated for currency formatting
3. The mock API delay is set to 500ms to simulate real network conditions
4. Checkbox selection uses the `coin` symbol as unique identifier

## Submission Details

- **Candidate**: [Your Name]
- **Email**: [Your Email]
- **GitHub**: [Your GitHub Username]
- **Deployed URL**: [Vercel/Netlify Link]

---

Built for KoinX Frontend Internship Assignment
