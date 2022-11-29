import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import type { RootState } from '../store/store';
import projectSlice from '../store/slices/projectSlice';
import speciesSlice from '../store/slices/speciesSlice';
import requestSlice from '../store/slices/requestSlice';

const rootReducer = combineReducers({
  projects: projectSlice,
  species: speciesSlice,
  request: requestSlice
});

const setupStore = (preloadedState?: PreloadedState<RootState>): any => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
};

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: ReturnType<typeof setupStore>
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
): any {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
