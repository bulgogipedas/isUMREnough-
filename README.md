# Finara 💰

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.x-00DC82?style=flat-square&logo=nuxt.js)](https://nuxt.com/)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

**Gaji Kamu Cukup Nggak Tinggal di Sini?**

Finara adalah kalkulator beban hidup yang membantu masyarakat Indonesia memahami apakah penghasilannya cukup untuk biaya hidup di provinsi tertentu, berdasarkan data resmi BPS dan UMR.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🗺️ **Peta Interaktif** | Pilih provinsi langsung dari peta Indonesia |
| ⚡ **Real-time Calculation** | Hasil update instan saat mengubah input |
| 📊 **Data Akurat** | Menggunakan data BPS SUSENAS 2024 |
| 🔒 **Privasi Aman** | Semua kalkulasi di browser, data tidak disimpan |
| 📱 **Mobile-First** | Responsive design untuk semua perangkat |
| 🎨 **iOS-Style UI** | Clean, minimal aesthetics dengan yellow accent |

---

## 🖼️ Screenshots

### Landing Page
- Hero section dengan statistik
- Feature cards (Bento grid)
- About section dengan sumber data

### Calculator
- Interactive Indonesia map
- Province dropdown selector
- Real-time surplus/deficit analysis
- UMR comparison progress bar
- Detailed expense breakdown

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Nuxt 3 + Vue 3 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State | Pinia |
| Maps | Vue Leaflet |
| CSV Parsing | PapaParse |
| Icons | Lucide Vue |

---

## 📁 Project Structure

```
finara/
├── components/
│   ├── base/                    # Reusable UI atoms
│   ├── dashboard/               # Calculator sub-components
│   ├── landing/                 # Landing page sections
│   │   ├── TheNavbar.vue
│   │   ├── HeroSection.vue
│   │   ├── FeaturesSection.vue
│   │   ├── AboutSection.vue
│   │   ├── CalculatorSection.vue
│   │   └── TheFooter.vue
│   └── map/                     # Map components
├── composables/                 # Vue composables
├── stores/                      # Pinia stores
├── types/                       # TypeScript definitions
├── utils/                       # Helper functions
└── pages/
    └── index.vue                # Landing page
```

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or Node.js 18+

### Installation

```bash
# Clone repository
git clone https://github.com/bulgogipedas/isUMREnough-.git
cd isUMREnough-

# Install dependencies
bun install

# Start development server
bun run dev
```

Visit `http://localhost:3000`

### Build for Production

```bash
bun run build
bun run preview
```

---

## 📊 Data Sources

| Data | Source | Year |
|------|--------|------|
| Pengeluaran per Kapita | BPS SUSENAS | 2024 |
| UMR/UMP | Official Government | 2024 |
| Indonesia Map | [superpikar/indonesia-geojson](https://github.com/superpikar/indonesia-geojson) | - |

---

## 🧮 How It Works

```
Total Pengeluaran = Pengeluaran per Kapita × Jumlah Tanggungan
Saldo = Penghasilan - Total Pengeluaran
Status = Surplus (jika Saldo > 0) | Defisit (jika Saldo < 0)
```

---

## 📝 License

MIT License - feel free to use this project for any purpose.

---

## 🙏 Acknowledgments

- **BPS Indonesia** - Data pengeluaran per kapita
- **Pemerintah Provinsi** - Data UMR/UMP
- **superpikar** - Indonesia GeoJSON
