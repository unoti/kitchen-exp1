import React, { useState, useCallback } from 'react';
import Kitchen from './Kitchen';
import OptionsPanel from './OptionsPanel';
import { Player } from '../../../shared/models/Player';
import { KitchenState } from '../../../shared/models/kitchen';
import useGameConnection from '../hooks/useGameConnection';
import { KitchenEvent } from '../../../shared/models/events';
import { GameDispatchContext } from './GameDispatchContext';

const LandingPage: React.FC = () => {
  const [player, setPlayer] = useState<Player>({id: "unknown", name: ""});
  const [kitchenState, setKitchenState] = useState<KitchenState>({ items: {}, people: {}, stations: {}});
  const connection = useGameConnection();

  // Create the dispatch function to handle game events
  const handleGameEvent = useCallback((event: KitchenEvent) => {
    // Log the event for debugging
    console.log("Dispatching event from LandingPage:", event);
    
    // Send the event to the server via WebSocket
    if (connection) {
      connection.send(event);
    }
  }, [connection]);

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
    <GameDispatchContext.Provider value={handleGameEvent}>
      <div>
        <h1>Welcome to Yes Chef</h1>
        <Kitchen kitchenState={kitchenState} />
        <OptionsPanel onSave={handleProfileSave} />
      </div>
    </GameDispatchContext.Provider>
  );
};

export default LandingPage;
