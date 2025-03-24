import React, { useEffect } from 'react';
import Kitchen from './Kitchen';
import OptionsPanel from './OptionsPanel';
import { Player } from '../../shared/models/Player';
import { LobbyProvider } from '../dataproviders/lobbyProvider';
import useGameConnection from '../hooks/useGameConnection';

const LandingPage: React.FC = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const connection = useGameConnection();
  useEffect(() => {
    if (connection && player) {
      connection.connect(player);
    }
  }, [connection, player]);

  const handleProfileSave = async (name: string) => {
    const newPlayer = { id: "temp", name };
    setPlayer(newPlayer);
    console.log("Player name saved:", name);
    const lobbyProvider = new LobbyProvider();
    try {
      const joinedRoom = await lobbyProvider.joinRoom(newPlayer);
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
