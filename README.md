# 🎲 Coin Flip Pet Picker 🐾

A fun and interactive React web application that flips a coin to randomly show you either a cute dog or cat image! Built with React, TypeScript, Vite, and Tailwind CSS.

## ✨ Features

- 🪙 Animated coin flip with realistic 3D rotation
- 🐕 Random dog images from [Dog CEO API](https://dog.ceo/dog-api/)
- 🐱 Random cat images from [The Cat API](https://thecatapi.com/)
- 🎨 Beautiful gradient UI with smooth animations
- 📱 Fully responsive design
- ⚡ Fast and lightweight

## 🚀 How It Works

1. Click the "Flip Coin" button
2. Watch the coin spin and land on either Heads (🐕) or Tails (🐱)
3. The result appears after the coin stops
4. A random pet image loads based on the result
5. Flip as many times as you want!

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.0 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## 🛠️ Installation & Setup

### 1. Download the Project

**Option A: Clone with Git**

```bash
git clone https://github.com/YOUR_USERNAME/CS360_assignment_4.git
cd CS360_assignment_4
```

Option B: Download ZIP

Click the green "Code" button on GitHub
Select "Download ZIP"
Extract the ZIP file
Open terminal/command prompt in the extracted folder 2. Install Dependencies
bashnpm install
This will install all required packages including:

React & React DOM
TypeScript
Vite
Tailwind CSS
Lucide React (for icons)

3. Run the Development Server
   bashnpm run dev
   The app will start at http://localhost:5173/
   Your browser should automatically open. If not, manually navigate to the URL shown in the terminal.
   📦 Build for Production
   To create a production-ready build:
   bashnpm run build
   The optimized files will be in the dist/ folder.
   To preview the production build:
   bashnpm run preview

## 🗂️ Project Structure

```bash
CS360_assignment_4/
├── public/                # Static assets (favicon, icons, etc.)
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   │   └── CoinFlip.tsx   # Main coin flip component
│   ├── App.tsx            # Root React component
│   ├── main.tsx           # Entry point for Vite + React
│   └── index.css          # Global styles & animations
├── .gitignore
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite settings
└── README.md


🎨 Technologies Used

React 18 - UI library
TypeScript - Type safety
Vite - Build tool and dev server
Tailwind CSS - Utility-first CSS framework
Lucide React - Icon library
Dog CEO API - Random dog images
The Cat API - Random cat images

🐛 Troubleshooting
Issue: npm run dev fails
Solution: Delete node_modules and package-lock.json, then run npm install again.
Issue: Tailwind styles not loading
Solution: Make sure tailwind.config.js and postcss.config.js exist and are properly configured.
Issue: APIs not fetching images
Solution: Check your internet connection. The app requires internet access to fetch pet images.
Issue: TypeScript errors
Solution: Ensure all tsconfig*.json files are present and properly configured.
📝 Scripts

npm run dev - Start development server
npm run build - Build for production
npm run preview - Preview production build
npm run lint - Run ESLint (if configured)

🌐 API Credits

Dog CEO API - Free dog images
The Cat API - Free cat images

📄 License
This project is open source and available for educational purposes.
👨‍💻 Author
Sohibjon Abdimannabov

Enjoy flipping coins and discovering adorable pets! 🎉
```
