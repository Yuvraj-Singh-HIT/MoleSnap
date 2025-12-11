<div align="center">

# 🧬 MoleSnap

### *AI-Powered Molecule Intelligence Lab*

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 18"/>
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
<img src="https://img.shields.io/badge/Supabase-Enabled-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"/>

**Transform molecule names into strategic insights in seconds**

[🚀 Start Analysis](#-quick-start) • [📖 Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [📚 Documentation](#-documentation)

---

</div>

## 🎯 What is MoleSnap?

Type **any molecule name** → Get **AI-powered intelligence** on:

```
✨ Clinical Trials & Evidence    🏥 Market Opportunities
💊 Competitive Landscape        📄 Patent Intelligence  
🎯 Strategic Recommendations    🔬 Drug Discovery Insights
```

**Perfect for:** Drug discovery teams, biotech researchers, pharmaceutical strategists, and IP analysts who need rapid molecular intelligence.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔍 **Smart Search**
- One-click quick-pick molecules
- Deep-link support (`/analysis?molecule=...`)
- Instant AI-powered analysis
- Default fallback to popular molecules

</td>
<td width="50%">

### 🎨 **Beautiful UI**
- Animated particle backgrounds
- 3D molecule visualizations
- Orbiting data tags (MK, PT, CT, IN)
- Dark/Light mode adaptive

</td>
</tr>
<tr>
<td width="50%">

### 🤖 **AI-Driven Intelligence**
- Agentic AI workflows
- Multi-source data synthesis
- Patent landscape mapping
- White space opportunity detection

</td>
<td width="50%">

### 🔐 **Authentication Ready**
- Supabase auth integration
- Session-aware UI states
- Secure API key management
- Protected routes & data

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js >= 18
npm or bun or pnpm
Supabase account (free tier works!)
AI provider API key (Gemini/OpenAI)
```

### Installation

```bash
# Clone the repo
git clone <your-repo-url> molesnap
cd molesnap

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your keys

# Start development server
npm run dev
```

🎉 Open [http://localhost:5173](http://localhost:5173) and start analyzing!

---

## 🔧 Environment Setup

Create a `.env` file in the root directory:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# AI Provider Keys
VITE_GEMINI_API_KEY=your-gemini-key
VITE_OPENAI_API_KEY=your-openai-key  # Optional

# App Configuration
VITE_APP_ENV=development
VITE_APP_BASE_URL=http://localhost:5173
```

> ⚠️ **Never commit `.env` files!** They're gitignored by default.

---

## 🛠️ Tech Stack

### **Frontend Core**
- ⚛️ **React 18** - Concurrent rendering & Suspense
- 📘 **TypeScript** - Type safety throughout
- ⚡ **Vite** - Lightning-fast HMR & builds
- 🎨 **Tailwind CSS** - Utility-first styling
- 🎭 **Framer Motion** - Buttery smooth animations

### **UI Components**
- 🎯 **shadcn/ui** - Radix-powered components
- 🎨 **Lucide React** - Beautiful icons
- 🧪 **3DMol** - Interactive molecule viz
- 📊 **Recharts** - Data visualizations

### **Backend & Services**
- 🗄️ **Supabase** - Auth, database, storage
- 🤖 **Agentic AI** - LLM orchestration
- 🔄 **TanStack Query** - Data fetching & caching
- 📝 **React Hook Form + Zod** - Form validation

### **Developer Experience**
- 🧹 **ESLint** - Code quality
- 🎨 **PostCSS** - CSS processing
- 📦 **npm** - Package management
- 🔥 **Hot Module Replacement** - Instant updates

---

## 📁 Project Structure

```
molesnap/
├── 📂 src/
│   ├── 🎨 components/
│   │   ├── Hero.tsx          # Landing page hero
│   │   └── ui/               # Reusable UI primitives
│   ├── 🔌 integrations/
│   │   └── supabase/         # Supabase client & config
│   ├── 📄 pages/             # Route components
│   ├── 🪝 hooks/             # Custom React hooks
│   ├── 🛠️ utils/             # Helper functions
│   ├── App.tsx               # Route definitions
│   ├── main.tsx              # React entry point
│   └── index.css             # Global styles
├── 📂 public/                # Static assets
├── 📂 supabase/              # DB migrations & config
├── ⚙️ vite.config.ts         # Vite configuration
├── 🎨 tailwind.config.ts     # Tailwind configuration
├── 📘 tsconfig.json          # TypeScript config
└── 📦 package.json           # Dependencies & scripts
```

---

## 🎮 Available Commands

```bash
# Development
npm run dev          # Start dev server with HMR
npm run build        # Production build → dist/
npm run build:dev    # Development build
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint checks
npm run type-check   # TypeScript validation
```

---

## 🎨 Key Components

### 🦸 Hero Component
The main landing experience featuring:
- Animated particle background (theme-aware)
- 3D molecule visualization with orbiting data tags
- Smart search with molecule suggestions
- Auth-aware button states
- Smooth navigation to analysis pages

```tsx
// Quick molecule analysis
handleStartAnalysis("Metformin");
// → navigates to /analysis?molecule=Metformin

// Smart defaults
handleStartAnalysis(); 
// → uses input or defaults to "Metformin"
```

### 🎭 Animation System
Built with Framer Motion:
- Floating particle effects
- Orbiting data indicators
- Gradient animations
- Smooth page transitions
- Micro-interactions on hover/click

### 🔐 Auth Flow
Supabase integration handles:
- Session detection on mount
- Loading states during auth checks
- Disabled UI during verification
- Protected route navigation

---

## 💡 Usage Examples

### Search for a Molecule

```tsx
// Navigate to analysis page
navigate(`/analysis?molecule=${encodeURIComponent("Aspirin")}`);
```

### Quick-Pick Molecules

The hero offers one-click analysis for:
- **Metformin** (Diabetes treatment)
- **Aspirin** (Pain reliever)
- **Ivermectin** (Antiparasitic)
- Custom input supported

### Deep Linking

Share direct analysis links:
```
https://yourapp.com/analysis?molecule=Paracetamol
https://yourapp.com/analysis?molecule=Ibuprofen
```

---

## 🐛 Troubleshooting

<details>
<summary><b>Blank page or console errors</b></summary>

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Ensure Node.js version
node --version  # Should be >= 18
```
</details>

<details>
<summary><b>Supabase authentication fails</b></summary>

- ✅ Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- ✅ Check Supabase dashboard for auth settings
- ✅ Restart dev server after env changes
- ✅ Confirm client import path is correct
</details>

<details>
<summary><b>Environment variables not loading</b></summary>

- ✅ All frontend vars must start with `VITE_`
- ✅ Restart dev server after editing `.env`
- ✅ Never commit `.env` files
- ✅ Check `.env.example` for reference
</details>

<details>
<summary><b>Styling issues</b></summary>

- ✅ Verify `tailwind.config.ts` includes src paths
- ✅ Check `index.css` imports Tailwind directives
- ✅ Clear browser cache
- ✅ Restart dev server
</details>

---

## 🚢 Deployment

### Recommended Platforms

| Platform | Best For | Setup Difficulty |
|----------|----------|------------------|
| **Vercel** | Zero-config React apps | ⭐ Easy |
| **Netlify** | Static sites + edge functions | ⭐ Easy |
| **Cloudflare Pages** | Global edge deployment | ⭐⭐ Medium |
| **Supabase Edge Functions** | Full-stack Supabase apps | ⭐⭐ Medium |

### Quick Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

Don't forget to set environment variables in your deployment platform!

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. ✅ Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🎉 Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful components
- **Supabase** for backend infrastructure  
- **Anthropic/OpenAI/Google** for AI capabilities
- **Radix UI** for accessible primitives
- **Tailwind Labs** for the amazing CSS framework

---

<div align="center">

### 🌟 Star us on GitHub — it helps!

Made with 💜 by Yuvraj Singh

[Report Bug](https://github.com/yourusername/molesnap/issues) • [Request Feature](https://github.com/yourusername/molesnap/issues) • [Documentation](https://github.com/yourusername/molesnap/wiki)

</div>
