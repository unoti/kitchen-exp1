import React from 'react';
import Kitchen from './Kitchen';
import OptionsPanel from './OptionsPanel';
import { Player } from '../../shared/models/Player';
import { LobbyProvider } from '../dataproviders/lobbyProvider';

interface LandingPageProps {
  player: Player;
}

const LandingPage: React.FC<LandingPageProps> = ({ player }) => {
  const handleProfileSave = async (name: string) => {
    console.log("Player name saved:", name);
    const lobbyProvider = new LobbyProvider();
    try {
      const joinedRoom = await lobbyProvider.joinRoom({ ...player, name });
      console.log("Joined room:", joinedRoom);
    } catch (error) {
      console.error("Error joining room:", error);
    }
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
