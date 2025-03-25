import React from 'react';
import './Player.scss';

interface PlayerProps {
  state: {
    id?: string | number;
    name?: string;
    [key: string]: any;
  };
}

const Player: React.FC<PlayerProps> = ({ state }) => {
  return (
    <div className="player">
      <h4>{state.name || 'Unnamed Player'}</h4>
      <p>ID: {state.id}</p>
    </div>
  );
};

export default Player;
