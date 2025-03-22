# Project Directory Structure

Below is a recommended project directory structure for **Yes Chef**:

YesChef/
├── README.md                 # Project overview and setup instructions
├── frontend/                 # React frontend application
│   ├── package.json          # Frontend dependencies and scripts
│   ├── public/               # Public assets (index.html, images, etc.)
│   └── src/                  # React components and application code
│       ├── components/       # Reusable components
│       ├── App.tsx           # Main app component
│       └── index.tsx         # Entry point for the React app
├── backend/                  # Node.js backend server
│   ├── package.json          # Backend dependencies and scripts
│   └── src/                  # Backend source code
│       ├── index.ts          # Entry point to the backend
│       └── game/             # Game logic and state management
├── docs/                     # Additional documentation
└── scripts/                  # Utility or deployment scripts

This structure clearly separates the frontend and backend while providing space for docs and utilities.
