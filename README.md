# 🗄️ ARKIVE - Enterprise Document Repository

**Store Smart. Find Fast.**

A professional, enterprise-grade document management system designed to replace IBM FileNet with a modern, intuitive interface.

![ARKIVE Banner](https://img.shields.io/badge/ARKIVE-Document%20Repository-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## ✨ Features

### 🎯 Core Functionality
- **Smart Document Organization** - Category-based color coding for different document types (HR, Finance, Legal, Marketing, etc.)
- **Advanced Search** - Real-time search with auto-suggestions
- **Multiple Views** - Toggle between List and Grid views
- **Drill-Down Navigation** - Click on any document class to view file structure
- **Dark Mode** - Professional dark theme with proper contrast
- **Responsive Design** - Optimized for desktop and tablet devices

### 📊 Smart Features
- **Collapsible Sidebar** - Golden archive logo with smooth animations
- **Dynamic Statistics** - Auto-collapsing stat cards showing key metrics
- **File Selection** - Download files individually or in groups
- **Smart Action Toolbars** - Context-aware actions based on selection
- **Pagination Controls** - Customizable items per page (10, 25, 50, 75, 100)
- **Column Sorting** - Ascending/descending order on all columns
- **Filter System** - Advanced filtering with saved searches
- **Recent Activity** - Quick access to recently viewed documents

### 🎨 Navigation Views
- **Home** - Browse all document classes
- **Starred** - Your favorite starred documents
- **Recent** - Recently accessed documents
- **Shared** - Documents shared with you and others
- **Archive** - Documents moved to archive

### 🎨 Design Highlights
- Bold typography with enterprise-grade aesthetics
- Gradient backgrounds and color-coded categories
- Professional golden/amber accent colors
- Smooth transitions and hover effects
- Table header with bold yellow/amber gradient

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/pnpm
- Git installed on your machine
- GitHub account
- Vercel account (free)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/arkive.git
   cd arkive
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open browser**
   ```
   http://localhost:5173
   ```

---

## 📦 Deployment to Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (see instructions below)

2. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account

3. **Import Project**
   - Click "Add New" → "Project"
   - Select your `arkive` repository from GitHub
   - Click "Import"

4. **Configure Project**
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Click "Deploy"

5. **Done!** 🎉
   - Your app will be live at `https://arkive-xxxxx.vercel.app`
   - Share this URL with your team!

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 📤 Pushing to GitHub

### First Time Setup

1. **Create a new repository on GitHub**
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `arkive`
   - Description: "Enterprise Document Repository - Store Smart. Find Fast."
   - Make it **Private** or **Public** (your choice)
   - Click "Create repository"

2. **Initialize and push from your local machine**
   ```bash
   # Navigate to your project folder
   cd /path/to/your/arkive/project

   # Initialize Git (if not already done)
   git init

   # Add all files
   git add .

   # Commit
   git commit -m "Initial commit: ARKIVE enterprise document repository"

   # Add remote (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/arkive.git

   # Push to GitHub
   git push -u origin main
   ```

### Subsequent Updates

```bash
# After making changes
git add .
git commit -m "Your commit message"
git push
```

---

## 🛠️ Tech Stack

- **Framework**: React 18.3 with TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel

---

## 📁 Project Structure

```
arkive/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ui/              # shadcn/ui components
│   │   │   ├── ArkiveLogo.tsx   # Golden archive logo
│   │   │   ├── StatCard.tsx     # Statistics cards
│   │   │   ├── FilterPanel.tsx  # Advanced filter panel
│   │   │   ├── DocumentDetailView.tsx
│   │   │   └── ...
│   │   └── App.tsx              # Main application
│   └── styles/
│       ├── index.css
│       ├── tailwind.css
│       ├── theme.css
│       └── fonts.css
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 🎨 Category Color Scheme

- **HR Documents** - Blue/Cyan gradient
- **Finance Documents** - Emerald/Teal gradient
- **Legal Documents** - Violet/Purple gradient
- **Marketing Documents** - Orange/Amber gradient
- **Enrollment Documents** - Indigo/Blue gradient
- **Accounts Documents** - Pink/Rose gradient

---

## 👥 Team Collaboration

### Sharing with Your Team

1. **Share the Vercel URL** after deployment
2. **Invite team members** to the GitHub repository (Settings → Collaborators)
3. **Set up branches** for different team members
4. **Use Pull Requests** for code review

VITE_API_URL=your_api_url_here
```

### 🎨 Minor Tweaks (Team Customization)

Team members can quickly customize the following:
- **Theme Colors & Branding**: Modify `src/styles/theme.css` to update primary gradients and accents.
- **Mock Data**: Update the `allFiles`, `recentActivity`, and `quickAccess` constants in `src/app/App.tsx` to change the dashboard content.
- **Sidebar Menu**: Add or remove navigation items in the `handleViewChange` logic within `App.tsx`.
- **UI Components**: All low-level components (Buttons, Inputs, Modals) are located in `src/app/components/ui/`.

---

## 📚 Supporting Documentation

Detailed guides are located in the `docs/` folder:
- [Walkthrough Guide](docs/ARKIVE_Walkthrough_Guide.md)
- [Team Quick Start](docs/TEAM_QUICK_START.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)

---

Add environment variables in Vercel dashboard:
- Go to Project Settings → Environment Variables

---

## 📊 Statistics Dashboard

The application includes auto-collapsing statistics cards showing:
- **Total Documents**: 12,847 documents (+12% trend)
- **Storage Used**: 847 GB
- **Shared Files**: 3,421 files (+8% trend)
- **Active Users**: 156 users (+5% trend)

---

## 🔐 User Roles

Current implementation includes:
- **Admin** - Full access (Ram P)
- Additional roles can be configured as needed

---

## 🐛 Known Issues & Limitations

- Document data is currently mocked for demonstration
- File downloads are simulated with alerts
- Requires backend integration for production use

---

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] Real authentication system
- [ ] Actual file upload/download
- [ ] Advanced search with filters
- [ ] Document versioning
- [ ] Collaboration features
- [ ] Mobile responsive optimization
- [ ] Export to PDF/Excel

---

## 📝 License

This project is proprietary and confidential.

---

## 👨‍💻 Development Team

Built with ❤️ for enterprise document management

**Tagline**: *Store Smart. Find Fast.*

---

## 📞 Support

For questions or issues, contact your development team.

---

## 🎯 Migration from IBM FileNet

This application is designed as a modern replacement for IBM FileNet, offering:
- ✅ Faster, more intuitive UI
- ✅ Better user experience
- ✅ Modern design and accessibility
- ✅ Easy customization and scalability
- ✅ Lower maintenance costs

---

**Made with Figma Make** 🚀
