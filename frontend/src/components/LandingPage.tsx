import React from 'react';
import Kitchen from './Kitchen.tsx';
import { Player } from '../models/Player';

interface LandingPageProps {
  player: Player;
}

const LandingPage: React.FC<LandingPageProps> = ({ player }) => {
  // For now we render the Kitchen component directly.
  // You can later add your menu or other navigational components here.
  return (
    <div>
      <h1>Welcome to Yes Chef</h1>
      <Kitchen />
    </div>
  );
};

export default LandingPage;
