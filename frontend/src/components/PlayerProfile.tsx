import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTrigger, 
  DialogSurface, 
  DialogTitle, 
  DialogBody, 
  DialogActions, 
  Button,
  Input,
  Label
} from '@fluentui/react-components';

interface PlayerProfileProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const PlayerProfile: React.FC<PlayerProfileProps> = ({ isOpen, onClose, onSave }) => {
  const [playerName, setPlayerName] = useState('');

  const handleSave = () => {
    if (playerName.trim()) {
      onSave(playerName);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(_, data) => !data.open && onClose()}>
      <DialogSurface>
        <DialogTitle>Set Your Profile</DialogTitle>
        <DialogBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Label htmlFor="playerName">Chef Name</Label>
            <Input 
              id="playerName"
              value={playerName} 
              onChange={(e, data) => setPlayerName(data.value)} 
              placeholder="Enter your chef name"
            />
          </div>
        </DialogBody>
        <DialogActions>
          <Button appearance="secondary" onClick={onClose}>Cancel</Button>
          <Button appearance="primary" onClick={handleSave}>Save</Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};

export default PlayerProfile;
