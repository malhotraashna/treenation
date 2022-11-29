import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './slices/projectSlice';
import requestSlice from './slices/requestSlice';
import speciesSlice from './slices/speciesSlice';

const store = configureStore({
  reducer: {
    projects: projectSlice,
    species: speciesSlice,
    request: requestSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
