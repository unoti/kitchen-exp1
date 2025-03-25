import React from 'react';
import { KitchenState } from '../../shared/models/kitchen';
import Station from './Station';
import Player from './Player';
import './Kitchen.scss';

interface KitchenProps {
  kitchenState: KitchenState;
}

const Kitchen: React.FC<KitchenProps> = ({ kitchenState }) => {
  // Position calculation for stations and players
  const calculateStationPosition = (index: number) => {
    const stationsPerRow = 4; // From CSS vars
    const stationWidth = 200;
    const stationHeight = 140;
    const stationGap = 50;
    const rowGap = 100;
    
    const row = Math.floor(index / stationsPerRow);
    const col = index % stationsPerRow;
    
    return {
      top: `${row * (stationHeight + rowGap)}px`,
      left: `${col * (stationWidth + stationGap)}px`
    };
  };

  const stations = Object.values(kitchenState.stations);
  
  // Get the maximum number of rows needed for the stations
  const numRows = Math.ceil(stations.length / 4);
  const containerHeight = numRows * (140 + 100) - 100 + 150; // Calculate height based on rows + padding

  return (
    <div>
      <h2>The Kitchen</h2>
      <div 
        className="kitchen-container" 
        style={{ height: `${containerHeight}px` }}
      >
        {/* Render stations with calculated positions */}
        {stations.map((station, index) => (
          <Station 
            state={station} 
            items={kitchenState.items} 
            key={station.name}
            style={calculateStationPosition(index)}
          />
        ))}
        
        {/* Render players at their station positions */}
        {Object.values(kitchenState.people).map((player, index) => {
          // Find which station this player occupies, if any
          const occupiedStation = stations.find(station => station.occupiedBy === player.id);
          const stationIndex = occupiedStation ? stations.indexOf(occupiedStation) : -1;
          
          // Only position if the player is at a station
          if (stationIndex >= 0) {
            const pos = calculateStationPosition(stationIndex);
            
            return (
              <Player 
                state={player} 
                key={player.id || index}
                style={{
                  top: `calc(${pos.top} + ${140 + 10}px)`, // Position below the station
                  left: pos.left,
                }}
              />
            );
          }
          
          // If player isn't at a station, position them at the bottom
          return (
            <Player 
              state={player} 
              key={player.id || index}
              style={{
                position: 'relative', // Override absolute positioning
                margin: '5px',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Kitchen;
