# 🚀 ARKIVE Deployment Guide

Complete step-by-step guide to deploy ARKIVE to GitHub and Vercel.

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- ✅ GitHub account ([Sign up here](https://github.com/join))
- ✅ Vercel account ([Sign up here](https://vercel.com/signup))
- ✅ Git installed on your computer ([Download here](https://git-scm.com/downloads))
- ✅ Your ARKIVE project files

---

## 🎯 Step 1: Create GitHub Repository

### Option A: Via GitHub Website (Easiest)

1. **Go to GitHub** and log in
   - Visit: https://github.com/new

2. **Fill in repository details:**
   - Repository name: `arkive`
   - Description: `Enterprise Document Repository - Store Smart. Find Fast.`
   - Visibility: Choose **Private** (recommended for internal team tools)
   - ❌ Do NOT initialize with README (we already have one)
   - Click **"Create repository"**

3. **Copy the repository URL**
   - It will look like: `https://github.com/YOUR_USERNAME/arkive.git`
   - Keep this tab open, you'll need these commands

---

## 📤 Step 2: Push Code to GitHub

### For Windows Users:

1. **Open Command Prompt or PowerShell**
   - Press `Win + R`, type `cmd`, and press Enter

2. **Navigate to your project folder**
   ```bash
   cd C:\path\to\your\arkive\project
   ```

3. **Initialize Git** (if not already done)
   ```bash
   git init
   ```

4. **Configure Git** (first time only)
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

5. **Add all files**
   ```bash
   git add .
   ```

6. **Commit files**
   ```bash
   git commit -m "Initial commit: ARKIVE enterprise document repository"
   ```

7. **Add remote repository** (replace YOUR_USERNAME)
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/arkive.git
   ```

8. **Push to GitHub**
   ```bash
   git branch -M main
   git push -u origin main
   ```

9. **Enter GitHub credentials when prompted**

### For Mac/Linux Users:

1. **Open Terminal**

2. **Navigate to your project folder**
   ```bash
   cd /path/to/your/arkive/project
   ```

3. **Follow steps 3-9 from Windows instructions above**

### Troubleshooting Git Push

If you get authentication errors:

**Option 1: Use Personal Access Token**
1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens
2. Generate new token (classic) with `repo` scope
3. Use token as password when pushing

**Option 2: Use GitHub Desktop**
1. Download [GitHub Desktop](https://desktop.github.com/)
2. Add your local repository
3. Publish to GitHub

---

## ✅ Step 3: Verify on GitHub

1. **Refresh your GitHub repository page**
2. **You should see all your files:**
   - ✅ src/ folder
   - ✅ package.json
   - ✅ README.md
   - ✅ vite.config.ts
   - ✅ And all other project files

---

## 🌐 Step 4: Deploy to Vercel

### Method 1: Via Vercel Dashboard (Recommended for Teams)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Click **"Sign Up"** (or "Log In" if you have an account)
   - Choose **"Continue with GitHub"**
   - Authorize Vercel to access your GitHub account

2. **Import Your Project**
   - Click **"Add New..."** button
   - Select **"Project"**
   - Find and select your **`arkive`** repository
   - Click **"Import"**

3. **Configure Project Settings**
   - **Project Name**: `arkive` (or customize)
   - **Framework Preset**: Should auto-detect as **Vite** ✅
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Environment Variables** (Optional - only if needed later)
   - Skip for now, click **"Deploy"**

5. **Wait for Deployment** ⏳
   - Vercel will:
     - ✅ Clone your repository
     - ✅ Install dependencies
     - ✅ Build your app
     - ✅ Deploy to production
   - This takes about 1-3 minutes

6. **Get Your Live URL** 🎉
   - Once done, you'll see: **"Congratulations! Your project is live!"**
   - Your URL will be something like: `https://arkive-xxxxx.vercel.app`
   - Click **"Visit"** to see your live app!

### Method 2: Via Vercel CLI (For Developers)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd /path/to/arkive
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? **Select your account**
   - Link to existing project? **N**
   - What's your project's name? **arkive**
   - In which directory is your code located? **./`**
   - Want to override settings? **N**

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

## 🔗 Step 5: Share with Your Team

### Get Your Shareable Links

After deployment, you'll have:

1. **Production URL**: `https://arkive-xxxxx.vercel.app`
   - This is your main, stable link
   - Share this with your team!

2. **Vercel Dashboard**: `https://vercel.com/your-username/arkive`
   - Manage deployments, settings, analytics

3. **GitHub Repository**: `https://github.com/YOUR_USERNAME/arkive`
   - View source code, collaborate

### Share with Team Members

**Option 1: Share Production URL**
```
Hi Team,

Our new ARKIVE document repository is now live! 🎉

🔗 Access here: https://arkive-xxxxx.vercel.app

Features:
✅ Browse all documents by category
✅ Dark mode toggle
✅ Search and filter
✅ Starred, Recent, Shared, and Archive views

Tagline: Store Smart. Find Fast.

Best regards,
Your Name
```

**Option 2: Invite to GitHub Repository**
1. Go to your GitHub repository
2. Click **Settings** → **Collaborators**
3. Click **"Add people"**
4. Enter team member's GitHub username or email
5. They'll get an invitation to collaborate

**Option 3: Invite to Vercel Project**
1. Go to Vercel dashboard
2. Select your `arkive` project
3. Click **Settings** → **Team**
4. Invite team members by email

---

## 🔄 Step 6: Making Updates

### When you make changes to the code:

1. **Save your changes**

2. **Commit and push to GitHub**
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push
   ```

3. **Automatic Deployment** 🚀
   - Vercel automatically detects the push
   - Rebuilds and deploys your app
   - Your live site updates in 1-2 minutes!

4. **Notify your team**
   - Vercel can send notifications on deployment

---

## 🎨 Custom Domain (Optional)

### Add your own domain (e.g., arkive.yourcompany.com)

1. **In Vercel Dashboard:**
   - Go to your project
   - Click **Settings** → **Domains**
   - Click **"Add"**
   - Enter your domain: `arkive.yourcompany.com`

2. **Update DNS Settings** (in your domain provider)
   - Add CNAME record:
     - Name: `arkive`
     - Value: `cname.vercel-dns.com`

3. **Wait for verification** (can take up to 48 hours)

---

## 📊 Monitor Your Deployment

### Vercel Dashboard Features:

- **Deployments**: View all deployment history
- **Analytics**: See page views, performance (free tier available)
- **Logs**: Debug any issues
- **Environment Variables**: Add API keys securely
- **Team**: Manage team access

---

## 🐛 Troubleshooting

### Build Failed on Vercel

**Issue**: Build error during deployment

**Solution**:
1. Check the build logs in Vercel dashboard
2. Make sure all dependencies are in package.json
3. Test locally: `npm run build`
4. Push fixes to GitHub

### Can't Push to GitHub

**Issue**: Authentication failed

**Solution**:
1. Use GitHub Personal Access Token instead of password
2. Or use GitHub Desktop app
3. Or set up SSH keys

### Site Shows 404

**Issue**: Page not found after deployment

**Solution**:
1. Check that `dist` folder is created during build
2. Verify Vercel output directory is set to `dist`
3. Check vite.config.ts has correct base path

### Dark Mode Not Working

**Issue**: Dark mode toggle doesn't work in production

**Solution**:
- This is expected - dark mode state doesn't persist
- Consider adding localStorage or cookie support later

---

## ✅ Deployment Checklist

Before going live, ensure:

- ✅ All files are committed to GitHub
- ✅ Build succeeds locally (`npm run build`)
- ✅ No sensitive data (API keys, passwords) in code
- ✅ README.md is up to date
- ✅ Team members know the URL
- ✅ Vercel project is set to correct branch (main)
- ✅ Environment variables added (if needed)

---

## 🎉 Success!

Your ARKIVE application is now:
- ✅ Live on the internet
- ✅ Accessible to your team
- ✅ Automatically deployed on updates
- ✅ Hosted on enterprise-grade infrastructure

**Live URL**: `https://arkive-xxxxx.vercel.app`

**Next Steps**:
1. Share with your team
2. Gather feedback
3. Make improvements
4. Push updates (auto-deploys!)

---

## 📞 Need Help?

- **Vercel Documentation**: https://vercel.com/docs
- **GitHub Documentation**: https://docs.github.com
- **Vite Documentation**: https://vite.dev

---

**Store Smart. Find Fast.** 🗄️✨

*Deployed with Vercel • Powered by React + Vite*
