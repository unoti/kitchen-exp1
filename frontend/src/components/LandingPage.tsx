import React from 'react';
import Kitchen from './Kitchen';
import OptionsPanel from './OptionsPanel';
import { Player } from '../models/Player';

interface LandingPageProps {
  player: Player;
}

const LandingPage: React.FC<LandingPageProps> = ({ player }) => {
  const handleProfileSave = (name: string) => {
    console.log("Player name saved:", name);
  };
  return (
    <div>
      <h1>Welcome to Yes Chef</h1>
      <Kitchen />
      <OptionsPanel onSave={handleProfileSave} />
    </div>
  );
};

export default LandingPage;
