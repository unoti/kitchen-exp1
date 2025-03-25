import React from 'react';
import { KitchenState } from '../../shared/models/kitchen';

interface KitchenProps {
  kitchenState: KitchenState;
}

const Kitchen: React.FC<KitchenProps> = ({ kitchenState }) => {
  return (
    <div>
      <h2>The Kitchen</h2>
      <p>This is where the magic happens! Explore the stations and start cooking.</p>
      <pre>{JSON.stringify(kitchenState, null, 2)}</pre>
    </div>
  );
};

export default Kitchen;
