import React from 'react';
import PlayerProfile from './PlayerProfile';

interface OptionsPanelProps {
  onClose: () => void;
  onSave: (name: string) => void;
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({ onClose, onSave }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', width: '300px' }}>
      <h2>Options</h2>
      <PlayerProfile onClose={onClose} onSave={onSave} />
    </div>
  );
};

export default OptionsPanel;
