# GitHub Pages Deployment Guide

## Prerequisites
- GitHub account
- Repository with your code
- Custom domain (optional)

## Deployment Steps

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Prepare for GitHub Pages deployment"
git push origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

### 3. Set Up Custom Domain (Optional)
1. In the Pages settings, add your custom domain
2. Add a `CNAME` file to your repository root with your domain name
3. Update your DNS settings to point to GitHub Pages

### 4. Files Added for GitHub Pages
- `404.html` - Handles client-side routing
- `.nojekyll` - Disables Jekyll processing
- Updated API paths for static hosting

## URL Structure
- Home: `https://yourusername.github.io/repository-name/`
- Events: `https://yourusername.github.io/repository-name/events`
- Projects: `https://yourusername.github.io/repository-name/projects`

## Custom Domain
- Home: `https://yourdomain.com/`
- Events: `https://yourdomain.com/events`
- Projects: `https://yourdomain.com/projects`

## Troubleshooting
- If routing doesn't work, check that `404.html` is in the root directory
- If assets don't load, verify all paths are relative
- If custom domain doesn't work, check DNS settings and CNAME file
