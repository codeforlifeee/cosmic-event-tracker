# 🌌 Cosmic Event Tracker

A modern React application for tracking Near-Earth Objects (NEOs) and cosmic events using NASA's Open APIs. Built with React, TypeScript, Tailwind CSS, and Supabase authentication.

## ✨ Features

- **🔐 Authentication**: Secure login/signup with Supabase Auth
- **🚀 NASA API Integration**: Real-time data from NASA Near Earth Object Web Service
- **🎨 Modern UI**: Beautiful, responsive design with ShadCN UI components
- **🔍 Filtering & Sorting**: Filter by hazardous status, sort by date/size/distance
- **📱 Mobile Responsive**: Works seamlessly on all device sizes
- **⚡ Performance**: Built with Vite for fast development and builds
- **🌙 Dark Theme**: Cosmic-themed dark interface

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + ShadCN UI
- **Authentication**: Supabase Auth
- **API**: NASA Near Earth Object Web Service
- **Icons**: Lucide React
- **State Management**: React Context + Custom Hooks
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cosmic-event-tracker.git
   cd cosmic-event-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your API keys:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_NASA_API_KEY=your_nasa_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

## 🔑 API Setup

### NASA API Key
1. Visit [NASA API Portal](https://api.nasa.gov/)
2. Sign up for a free API key
3. Add the key to your `.env` file as `VITE_NASA_API_KEY`

### Supabase Setup
1. Create a [Supabase](https://supabase.com) project
2. Go to Settings > API
3. Copy your project URL and anon key to `.env`

**Note**: The app includes a demo mode that works without Supabase configuration for testing purposes.

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Environment Variables for Deployment
Make sure to set these environment variables in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_NASA_API_KEY`

## 🏗 Project Structure

```
cosmic-event-tracker/
├── src/
│   ├── components/
│   │   ├── ui/              # ShadCN UI components
│   │   ├── auth/            # Authentication components
│   │   ├── events/          # Event-related components
│   │   └── layout/          # Layout components
│   ├── hooks/               # Custom React hooks
│   ├── context/             # React Context providers
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   └── lib/                 # Shared libraries
├── public/                  # Static assets
├── package.json
└── README.md
```

## 🎯 Core Components

- **EventList**: Main component displaying NEO events
- **EventCard**: Individual event display card
- **EventDetail**: Detailed modal view for events
- **FilterControls**: Filtering and sorting interface
- **AuthForm**: Login/signup form
- **Layout**: Main app layout with header

## 🔧 Customization

### Styling
- Modify `src/index.css` for global styles
- Update `tailwind.config.js` for theme customization
- Component styles use Tailwind utility classes

### API Configuration
- NASA API settings in `src/utils/nasa-api.ts`
- Supabase configuration in `src/utils/supabase.ts`

## 📚 Learning Resources

This project demonstrates:
- Modern React patterns with hooks
- TypeScript integration
- Component composition
- API integration and error handling
- Authentication flows
- Responsive design
- State management with Context

## 🐛 Troubleshooting

### Common Issues

1. **API Rate Limits**: NASA API has rate limits. Use your own API key for production.
2. **Supabase Auth**: Ensure your Supabase project is properly configured for authentication.
3. **Environment Variables**: Make sure all required environment variables are set.

### Debug Mode
Set `NODE_ENV=development` to enable debug logging.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [NASA Open Data Portal](https://api.nasa.gov/) for providing the NEO data
- [Supabase](https://supabase.com) for authentication services
- [ShadCN UI](https://ui.shadcn.com/) for beautiful UI components
- [Lucide](https://lucide.dev/) for the icon set

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ and ☄️ for space enthusiasts**
