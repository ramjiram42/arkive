# 📘 ARKIVE Deployment Guide

Your ARKIVE app is built using React and Vite, making it incredibly fast to deploy to hosts like Vercel or Netlify.

## Step 1: Pushing to GitHub

Since you already have the repository `https://github.com/ramjiram42/arkive`, you just need to push the code:

```bash
cd path/to/arkive
git add .
git commit -m "Initial commit: ARKIVE Production Ready"
git push -u origin main
```

## Step 2: Deploying to Vercel

1. Go to [Vercel](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import your `arkive` repository from GitHub.
4. Leave all settings as default (Framework Preset: Vite, Build Command: `npm run build`, Output Directory: `dist`).
5. Click **Deploy**.

## Troubleshooting

- **Build Fails**: Ensure you wait 1-2 minutes for Vercel to install dependencies. If it fails, check the deployment logs on the Vercel dashboard.
- **Routing Issues**: Because this is a Single Page Application (SPA), Vercel automatically configures routing correctly for Vite apps.
