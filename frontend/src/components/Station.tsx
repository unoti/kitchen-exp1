import React from 'react';
import './Station.scss';
import { ItemMap } from '../../shared/models/kitchen';

interface StationProps {
  state: {
    name: string;
    inventory: { [key: number]: number };
    occupiedBy: string | null;
    holdTypes: string[];
  };
  items: ItemMap;
}

const Station: React.FC<StationProps> = ({ state, items }) => {
  return (
    <div className="station">
      <h4 className="station-name">{state.name}</h4>
      <div className="station-inventory">
        <ul>
          {Object.entries(state.inventory).map(([itemId, qty]) => {
            const item = items[parseInt(itemId)];
            const itemName = item ? item.name : `Unknown Item ${itemId}`;
            return (
              <li key={itemId}>
                {itemName}: {qty === 9999 ? 'Unlimited' : qty}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Station;
