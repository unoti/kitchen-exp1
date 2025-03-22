import React, { useState } from 'react';
import Kitchen from './Kitchen.tsx';
import { Player } from '../models/Player';
import PlayerProfile from './PlayerProfile';

interface LandingPageProps {
  player: Player;
}

const LandingPage: React.FC<LandingPageProps> = ({ player }) => {
  const [profileOpen, setProfileOpen] = useState(true);
  const handleProfileSave = (name: string) => {
    console.log("Player name saved:", name);
    setProfileOpen(false);
  };
  // For now we render the Kitchen component directly.
  // You can later add your menu or other navigational components here.
  return (
    <div>
      <h1>Welcome to Yes Chef</h1>
      <Kitchen />
      <PlayerProfile
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        onSave={handleProfileSave}
      />
    </div>
  );
};

export default LandingPage;
