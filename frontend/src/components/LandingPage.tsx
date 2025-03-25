import React, { useState, useEffect } from 'react';
import Kitchen from './Kitchen';
import OptionsPanel from './OptionsPanel';
import { Player } from '../../shared/models/Player';
import useGameConnection from '../hooks/useGameConnection';

const LandingPage: React.FC = () => {
  const [player, setPlayer] = useState<Player>({id: "unknown", name: ""});
  const connection = useGameConnection();

  const handleProfileSave = async (name: string) => {
    const newPlayer = { ...player, name };
    console.log("Saving player profile:", newPlayer);
    setPlayer(newPlayer);
    if (connection) {
      connection.onEvent = (event: any) => {
        console.log("Received event from server:", event);
      };
      connection.connect(newPlayer);
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
