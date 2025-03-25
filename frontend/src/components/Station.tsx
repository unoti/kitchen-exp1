import React, { useContext } from 'react';
import './Station.scss';
import { ItemMap } from '../../../shared/models/kitchen';
import { GameDispatchContext } from './GameDispatchContext';
import { KitchenEventType } from '../../../shared/models/events';

interface StationProps {
  state: {
    name: string;
    inventory: { [key: number]: number };
    occupiedBy: string | null;
    holdTypes: string[];
  };
  items: ItemMap;
  style?: React.CSSProperties;
}

const Station: React.FC<StationProps> = ({ state, items, style }) => {
  const dispatch = useContext(GameDispatchContext);
  
  const handleStationClick = () => {
    // Only dispatch if we have a valid station name
    if (state.name) {
      dispatch({
        type: KitchenEventType.MOVE_TO_STATION,
        payload: {
          personId: 'unknown', // Will be set by the server based on connection
          stationName: state.name
        }
      });
    }
  };

  // Determine if the station is occupied
  const isOccupied = !!state.occupiedBy;
  const stationClass = `station${isOccupied ? ' occupied' : ''}`;
  
  return (
    <div 
      className={stationClass} 
      style={style}
      onClick={handleStationClick}
    >
      <h4 className="station-name">{state.name}</h4>
      <div className="station-inventory">
        <ul>
          {Object.entries(state.inventory).map(([itemId, qty]) => {
            const item = items[parseInt(itemId)];
            const itemName = item ? item.name : `Unknown Item ${itemId}`;
            return (
              <li key={itemId}>
                {itemName} {qty === 9999 ? '' : ':' + qty}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Station;
