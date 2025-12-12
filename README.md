# Finara

**Financial Health Assessment Platform**

A comprehensive tool designed to analyze financial viability across different Indonesian provinces based on official BPS (Statistics Indonesia) data and regional minimum wage standards (UMR/UMP).

---

## Overview

Finara enables users to evaluate their financial standing by comparing household income against provincial living costs. The platform processes official statistical data to provide accurate surplus/deficit calculations and regional comparisons.

---

## Features

- **Interactive Geospatial Visualization**  
  Renders Indonesia's 38 provinces using Leaflet.js with performance-optimized GeoJSON rendering. Supports dynamic theme-based map tiles.

- **Real-time Financial Calculation**  
  Instant assessment of surplus/deficit based on income, dependents, and per capita expenditure data.

- **Regional Comparison**  
  Comparative analysis tool allowing users to evaluate purchasing power parity between different provinces.

- **Privacy-First Architecture**  
  Client-side processing ensures user financial data never leaves the browser.

- **Internationalization**  
  Full support for Indonesian (ID) and English (EN) languages.

- **Theme Support**  
  Light and dark mode with adaptive UI components.

---

## Technology Stack

| Category | Technology |
|----------|------------|
| Core Framework | Nuxt 3 (Vue 3, TypeScript) |
| State Management | Pinia |
| Styling | Tailwind CSS |
| Maps | Leaflet / Vue-Leaflet |
| Data Processing | PapaParse |
| Internationalization | @nuxtjs/i18n |
| Theme Management | @nuxtjs/color-mode |

---

## Local Development

### Prerequisites

- Node.js 18+ or Bun 1.0+
- Git

### Installation

```bash
git clone https://github.com/bulgogipedas/isUMREnough-.git
cd isUMREnough-
```

```bash
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
# Generate static files
bun run generate

# Build for SSR
bun run build

# Preview production build
bun run preview
```

---

## Project Structure

```
├── components/
│   ├── landing/          # Landing page components
│   ├── map/              # Map visualization
│   └── DashboardWidget.vue
├── composables/          # Reusable composition functions
├── i18n/
│   └── locales/          # Translation files (id.json, en.json)
├── pages/
│   ├── index.vue         # Landing page
│   └── calculator.vue    # Main application
├── stores/               # Pinia state management
├── types/                # TypeScript definitions
├── utils/                # Helper functions and constants
└── public/
    └── pengeluaran_perkapita_2024.csv
```

---

## Calculation Method

```
Total Monthly Expense = Per Capita Expenditure × Number of Dependents
Balance = Monthly Income - Total Monthly Expense
UMR Ratio = (Monthly Income / Provincial UMR) × 100%
```

### Status Classification

| Status | Condition |
|--------|-----------|
| Surplus | Income > Expenses |
| Deficit | Expenses > Income |
| Break-even | Income = Expenses |

---

## Data Sources

| Data Type | Source | Year |
|-----------|--------|------|
| Per Capita Expenditure | Badan Pusat Statistik (BPS) - SUSENAS | 2024 |
| Provincial Minimum Wage | Official Provincial Government Standards | 2024 |
| Geographic Boundaries | [superpikar/indonesia-geojson](https://github.com/superpikar/indonesia-geojson) | - |

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Attribution

- Badan Pusat Statistik (BPS) Indonesia
- superpikar - Indonesia GeoJSON data
