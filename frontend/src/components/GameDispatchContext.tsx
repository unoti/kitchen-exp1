import { createContext } from 'react';
import { KitchenEvent } from '../../../shared/models/events';

// Create context for game event dispatch
type GameDispatch = (event: KitchenEvent) => void;

// Default value is a no-op function
export const GameDispatchContext = createContext<GameDispatch>(() => {});