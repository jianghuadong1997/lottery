import { configureStore } from '@reduxjs/toolkit';
import poolReducer from './slices/poolSlice';
import drawReducer from './slices/drawSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    pool: poolReducer,
    draw: drawReducer,
    settings: settingsReducer,
  },
}); 