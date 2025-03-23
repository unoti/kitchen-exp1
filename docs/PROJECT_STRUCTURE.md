# Project Directory Structure

Below is a recommended project directory structure for **Yes Chef**:

```
YesChef/
├── README.md                 # Project overview and setup instructions
├── frontend/                 # React frontend application
│   ├── package.json          # Frontend dependencies and scripts
│   ├── node_modules/         # Frontend Dependencies (not in source control)
│   ├── public/               # Public assets (index.html, images, etc.)
│   └── src/
│       ├── components/       # React components
│       ├── dataproviders/    # Modules for backend data interactions
│       ├── models/           # Data models used on the front end only
│       ├── App.tsx           # Main app component
│       └── index.tsx         # Entry point for the React app
├── backend/                  # Node.js backend server
│   ├── package.json          # Backend dependencies
│   ├── node_modules/         # Dependencies for backend (not in source control)
│   └── src/
│       ├── index.ts          # Entry point to the backend
│       └── game/             # Game logic and state management
├── shared/                   # Shared items for both frontend and backend   
├── docs/                     # Additional documentation
└── scripts/                  # Utility or deployment scripts

This structure clearly separates the frontend and backend while providing space for docs and utilities.
```