# Deployment Guide

## Vercel Deployment (Recommended)

1. **Build the project locally to test**:
   ```bash
   npm run build
   npm run preview
   ```

2. **Deploy to Vercel**:
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` in the project directory
   - Follow the prompts
   - Set environment variables in Vercel dashboard

3. **Environment Variables for Vercel**:
   - Go to your project in Vercel dashboard
   - Settings > Environment Variables
   - Add:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_NASA_API_KEY`

## Alternative Deployment Options

### Netlify
1. Build: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in Netlify settings

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run: `npm run deploy`

### Docker Deployment
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t cosmic-event-tracker .
docker run -p 80:80 cosmic-event-tracker
```
