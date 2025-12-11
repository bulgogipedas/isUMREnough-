# Kalkulator Beban Hidup 💰

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.x-00DC82?style=flat-square&logo=nuxt.js)](https://nuxt.com/)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Pinia](https://img.shields.io/badge/Pinia-2.x-FFD859?style=flat-square)](https://pinia.vuejs.org/)

A beautiful, iOS-style financial health calculator for Indonesian users. Calculate your cost of living burden based on official BPS (Badan Pusat Statistik) expenditure data and compare your income against provincial minimum wages (UMR).

![Kalkulator Beban Hidup Preview](https://via.placeholder.com/800x400?text=App+Preview)

---

## 📋 About

**Kalkulator Beban Hidup** helps Indonesian workers and families understand their financial health by:

- 📊 Calculating total monthly expenses based on per-capita expenditure data from BPS
- 💼 Comparing income against provincial minimum wages (UMR/UMP)
- 👨‍👩‍👧‍👦 Adjusting calculations based on number of dependents
- 🗺️ Providing province-specific data through an interactive map

This tool empowers users to make informed financial decisions by visualizing whether their income creates a surplus or deficit against estimated living costs.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🗺️ **Interactive Map** | Click on any Indonesian province to select it for calculation |
| ⚡ **Real-time Calculation** | Results update instantly as you change inputs |
| 📱 **Responsive Design** | Desktop split-screen layout, mobile-optimized stacked view |
| 🎨 **iOS-style UI** | Clean, minimal aesthetics with subtle shadows and rounded corners |
| 📈 **Visual Analytics** | Progress bars and status indicators for quick comprehension |
| 🔢 **38 Provinces** | Complete coverage of all Indonesian provinces with 2024 data |
| 🇮🇩 **Bahasa Indonesia** | Full Indonesian language interface |

---

## 🛠️ Tech Stack

### Core Framework
- **[Nuxt 3](https://nuxt.com/)** - Vue.js meta-framework with SSR support
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework (Composition API)
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide Vue](https://lucide.dev/)** - Beautiful icon library

### State & Data
- **[Pinia](https://pinia.vuejs.org/)** - Vue store library
- **[PapaParse](https://www.papaparse.com/)** - CSV parsing library

### Mapping
- **[Vue Leaflet](https://vue-leaflet.github.io/vue-leaflet/)** - Vue wrapper for Leaflet.js
- **[Leaflet](https://leafletjs.com/)** - Interactive map library

---

## 📁 Project Structure

```
kalkulator-beban-hidup/
├── components/
│   ├── base/                    # Reusable UI atoms
│   │   ├── BaseCard.vue
│   │   ├── BaseButton.vue
│   │   └── BaseInput.vue
│   ├── dashboard/               # Dashboard sub-components
│   │   ├── DashboardHeader.vue
│   │   ├── InputForm.vue
│   │   ├── ResultStatus.vue
│   │   ├── AnalysisCard.vue
│   │   ├── SummaryCard.vue
│   │   ├── BreakdownCard.vue
│   │   ├── UmpComparisonCard.vue
│   │   └── EmptyState.vue
│   ├── map/
│   │   └── MapWidget.vue        # Interactive Indonesia map
│   └── DashboardWidget.vue      # Dashboard orchestrator
├── composables/
│   ├── useExpenditureData.ts    # CSV data loading
│   ├── useGeoJson.ts            # Map data fetching
│   └── useStatusConfig.ts       # UI status styling
├── stores/
│   └── calculator.ts            # Pinia calculator store
├── types/
│   └── index.ts                 # Centralized TypeScript definitions
├── utils/
│   ├── constants.ts             # UMP data & province matching
│   └── formatters.ts            # Currency & number formatting
├── pages/
│   └── index.vue                # Main application page
└── public/
    └── pengeluaran_perkapita_2024.csv  # BPS expenditure data
```

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/kalkulator-beban-hidup.git
cd kalkulator-beban-hidup

# Install dependencies
bun install

# Start development server
bun run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Build the application
bun run build

# Preview production build
bun run preview
```

---

## 📊 Data Sources

### Expenditure Data
- **Source:** Badan Pusat Statistik (BPS) Indonesia
- **Dataset:** Survei Sosial Ekonomi Nasional (SUSENAS) 2024
- **Metric:** Average monthly per-capita expenditure (food + non-food)

### Minimum Wage Data
- **Source:** Official provincial government announcements
- **Year:** 2024/2025
- **Coverage:** 38 Indonesian provinces

### Geographic Data
- **GeoJSON:** [superpikar/indonesia-geojson](https://github.com/superpikar/indonesia-geojson)
- **License:** Open source

---

## 🧮 Calculation Logic

```
Total Monthly Expense = Per-Capita Expenditure × Number of Dependents
Balance = Monthly Income - Total Monthly Expense
UMR Comparison = (Monthly Income / Provincial UMR) × 100%
Income vs Expense Ratio = (Monthly Income / Total Expense) × 100%
```

### Status Classification
- **Surplus** 🟢 - Income exceeds expenses
- **Deficit** 🔴 - Expenses exceed income
- **Neutral** ⚪ - Income equals expenses

---

## 🎨 Design System

The UI follows iOS-style aesthetics:

- **Shapes:** Heavily rounded corners (`rounded-2xl`, `rounded-3xl`)
- **Shadows:** Subtle depth with custom `shadow-ios` utilities
- **Colors:**
  - Primary: Yellow (`#facc15`) for optimism
  - Surplus: Soft green (`#22c55e`)
  - Deficit: Soft red (`#ef4444`)
  - Backgrounds: White/Gray-50
- **Typography:** System font stack for native feel

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **BPS Indonesia** for providing comprehensive expenditure statistics
- **superpikar** for the Indonesia GeoJSON data
- **Nuxt Team** for the amazing Vue.js framework
- **Tailwind Labs** for the utility-first CSS framework
