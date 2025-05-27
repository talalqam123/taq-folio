# TAQ Portfolio Frontend

This is the frontend React application for the TAQ Portfolio project.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Environment Variables

Create a `.env` file in the root directory with:

```env
VITE_API_URL=http://localhost:3000 # Backend API URL
```

## Deployment

### Deploying to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variables in Vercel dashboard
5. Deploy!

### Deploying to Netlify

1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy!

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Type-check TypeScript files 