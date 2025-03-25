import React, { useState, useEffect } from 'react';
import Kitchen from './Kitchen';
import OptionsPanel from './OptionsPanel';
import { Player } from '../../shared/models/Player';
import { KitchenState } from '../../shared/models/kitchen';
import useGameConnection from '../hooks/useGameConnection';

const LandingPage: React.FC = () => {
  const [player, setPlayer] = useState<Player>({id: "unknown", name: ""});
  const [kitchenState, setKitchenState] = useState<KitchenState>({ items: {}, people: {}, stations: {}});
  const connection = useGameConnection();

  const handleProfileSave = async (name: string) => {
    const newPlayer = { ...player, name };
    console.log("Saving player profile:", newPlayer);
    setPlayer(newPlayer);
    if (connection) {
      connection.onEvent = (event: any) => {
        console.log("Received event from server:", event);
        if (event.type === 'STATE_UPDATE') {
          setKitchenState(event.payload.state);
        }
      };
      connection.connect(newPlayer);
    }
  };
  return (
    <div>
      <h1>Welcome to Yes Chef</h1>
      <Kitchen kitchenState={kitchenState} />
      <OptionsPanel onSave={handleProfileSave} />
    </div>
  );
};

export default LandingPage;
