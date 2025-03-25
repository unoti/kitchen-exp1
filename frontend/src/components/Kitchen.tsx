import React from 'react';
import { KitchenState } from '../../shared/models/kitchen';
import Station from './Station';
import Player from './Player';

interface KitchenProps {
  kitchenState: KitchenState;
}

const Kitchen: React.FC<KitchenProps> = ({ kitchenState }) => {
  return (
    <div>
      <h2>The Kitchen</h2>
      <div className="stations">
        <h3>Stations</h3>
        {Object.values(kitchenState.stations).map(station => (
          <Station state={station} items={kitchenState.items} key={station.name} />
        ))}
      </div>
      <div className="players">
        <h3>Players</h3>
        {Object.values(kitchenState.people).map((player, index) => (
          <Player state={player} key={player.id || index} />
        ))}
      </div>
    </div>
  );
};

export default Kitchen;
