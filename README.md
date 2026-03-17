# FounderMatch — Co-Founder Matching Platform

A modern SaaS landing page built with **Vite + TypeScript + React + TailwindCSS**.

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open http://localhost:5173
```

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
foundermatch/
├── public/
│   └── fm_canva.png         # Business model canvas
├── src/
│   ├── components/
│   │   ├── Navbar.tsx        # Sticky navigation with mobile menu
│   │   ├── Hero.tsx          # Hero with animated match card
│   │   ├── Problem.tsx       # Why partnerships fail + stats
│   │   ├── HowItWorks.tsx    # 4-step process
│   │   ├── Features.tsx      # Platform features grid
│   │   ├── WhoItsFor.tsx     # Customer segments
│   │   ├── Pricing.tsx       # 4 pricing tiers (Gold highlighted)
│   │   ├── Marketplace.tsx   # Talent marketplace
│   │   ├── CompatibilityQuiz.tsx  # Interactive 15-question quiz
│   │   ├── CTA.tsx           # Final call-to-action
│   │   └── Footer.tsx        # Links + social
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css             # Tailwind + custom animations
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## ✨ Features

- **Work Sans** font from Google Fonts
- Fully responsive (mobile + desktop)
- Sticky blur navbar with scroll detection
- Animated hero with floating match card
- Interactive 15-question compatibility quiz (from Founders Matrimony doc)
- Gold Match pricing card highlighted with ring + scale effect
- Smooth scroll animations with IntersectionObserver
- Production-ready component architecture

## 🎨 Color Palette

- **Brand Blue**: `#3b5bdb` (brand-700)
- **Gold Accent**: `#f59e0b` (amber-500) — used for Gold Match plan
- **Background**: White + Slate-50 alternating sections
- **Dark Footer**: Gray-950
