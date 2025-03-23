import React, { useState } from 'react';
import { Button, Input, Label } from '@fluentui/react-components';

interface PlayerProfileProps {
  onClose: () => void;
  onSave: (name: string) => void;
}

const PlayerProfile: React.FC<PlayerProfileProps> = ({ isOpen, onClose, onSave }) => {
  const [playerName, setPlayerName] = useState('Unoti');

  const handleSave = () => {
    if (playerName.trim()) {
      onSave(playerName);
    }
  };

  return (
    <div>
      <h2>Set Your Profile</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Label htmlFor="playerName">Chef Name</Label>
        <Input 
          id="playerName"
          value={playerName} 
          onChange={(e, data) => setPlayerName(data.value)} 
          placeholder="Enter your chef name"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button appearance="secondary" onClick={onClose}>Cancel</Button>
        <Button appearance="primary" onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default PlayerProfile;
