# Finara

**Financial Health Assessment Platform**

A comprehensive tool designed to analyze financial viability across different Indonesian provinces based on official BPS (Statistics Indonesia) data and regional minimum wage standards (UMR/UMP).

---

## Features

- **Interactive Geospatial Visualization**  
  Renders Indonesia's 38 provinces using Leaflet.js with performance-optimized GeoJSON rendering. Province selection via click interaction with real-time style updates.

- **Real-time Financial Calculation**  
  Instant assessment of surplus/deficit based on income, dependents, and per capita expenditure data. Calculations are performed client-side with reactive state management.

- **Regional Comparison**  
  Comparative analysis tool allowing users to evaluate purchasing power parity between different provinces. Displays cost differential and savings potential.

- **Privacy-First Architecture**  
  Client-side processing ensures user financial data never leaves the browser. No server-side data collection or storage.

---

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | Nuxt 3 (Vue 3) |
| Language | TypeScript |
| State Management | Pinia |
| Styling | Tailwind CSS |
| Maps | Leaflet / Vue-Leaflet |
| Data Processing | PapaParse |
| Icons | Lucide Vue |

---

## Project Structure

```
finara/
├── components/
│   ├── base/           # Reusable UI components
│   ├── dashboard/      # Calculator and result components
│   ├── landing/        # Landing page sections
│   └── map/            # Map visualization
├── composables/        # Vue composables
├── stores/             # Pinia state management
├── types/              # TypeScript definitions
├── utils/              # Helper functions and constants
└── pages/
    ├── index.vue       # Landing page
    └── calculator.vue  # Main application
```

---

## Local Development

### Prerequisites

- Node.js 18+ or Bun runtime
- Package manager (npm, yarn, or bun)

### Installation

```bash
# Clone repository
git clone https://github.com/bulgogipedas/isUMREnough-.git
cd isUMREnough-

# Install dependencies
bun install
# or
npm install
```

### Development Server

```bash
bun run dev
# or
npm run dev
```

Application runs at `http://localhost:3000`

### Production Build

```bash
bun run build
bun run preview
```

---

## Calculation Methodology

```
Total Expenditure = Per Capita Expenditure × Number of Dependents
Balance = Monthly Income - Total Expenditure
Status = Surplus (Balance > 0) | Deficit (Balance < 0)
```

Financial health ratio is calculated as:

```
Ratio = (Income / Total Expenditure) × 100

>=150%  : Excellent
>=120%  : Good
>=100%  : Adequate
>=80%   : Needs Attention
<80%    : Critical
```

---

## Data Sources

| Data | Source | Year |
|------|--------|------|
| Per Capita Expenditure | BPS SUSENAS | 2024 |
| Provincial Minimum Wage (UMP) | Government Standards | 2024 |
| Indonesia GeoJSON | superpikar/indonesia-geojson | - |

---

## License

MIT License

---

## Acknowledgments

- Badan Pusat Statistik (BPS) Indonesia for expenditure data
- Provincial governments for minimum wage data
- superpikar for Indonesia GeoJSON
