export interface Station {
  id: string;
  name: string;
  description: string;
}

const stations: Station[] = [
  { id: 'pantry', name: 'Pantry', description: 'Dry goods, veggies, spices, etc.' },
  { id: 'refrigerator', name: 'Refrigerator', description: 'Perishables and dairy.' },
  { id: 'cupboard', name: 'Cupboard', description: 'Dishes, pans, and utensils.' },
  { id: 'cuttingBoard', name: 'Cutting Board', description: 'Prepping ingredients.' },
  { id: 'stove', name: 'Stove', description: 'Cooking station.' },
  { id: 'deliveryCounter', name: 'Delivery Counter', description: 'Serve or deliver finished dishes.' },
];

export function getAllStations(): Station[] {
  // This function returns hard-coded stations for prototyping.
  return stations;
}
