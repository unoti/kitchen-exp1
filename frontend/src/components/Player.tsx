import React from 'react';
import './Player.scss';

interface PlayerProps {
  state: {
    id?: string | number;
    name?: string;
    [key: string]: any;
  };
  style?: React.CSSProperties; // Adding style prop
}

const Player: React.FC<PlayerProps> = ({ state, style }) => {
  return (
    <div className="player" style={style}> {/* Apply style prop */}
      <h4>{state.name || 'Unnamed Player'}</h4>
    </div>
  );
};

export default Player;
