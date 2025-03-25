import React from 'react';
import './Station.scss';

interface StationProps {
  state: {
    name: string;
    inventory: { [key: number]: number };
    occupiedBy: string | null;
    holdTypes: string[];
  };
}

const Station: React.FC<StationProps> = ({ state }) => {
  return (
    <div className="station">
      <h4>{state.name}</h4>
      <p>Occupied by: {state.occupiedBy || 'None'}</p>
      <div>
        Inventory:
        <ul>
          {Object.entries(state.inventory).map(([itemId, qty]) => (
            <li key={itemId}>
              Item {itemId}: {qty}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Station;
