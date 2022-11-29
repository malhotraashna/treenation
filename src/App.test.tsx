import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';
import services from './services/services';
import { getProjectsMockValue, getSpeciesDetailsMockValue, getSpeciesMockValue } from './__mockData__/mockData';
import { renderWithProviders } from './utils/test-utils';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import store from './store/store';

beforeEach(() => {
  jest.spyOn(services, 'getProjects').mockResolvedValue(getProjectsMockValue);
  jest.spyOn(services, 'getSpecies').mockResolvedValue(getSpeciesMockValue);
  jest.spyOn(services, 'getSpeciesDetails').mockResolvedValue(getSpeciesDetailsMockValue);
});

describe('renders app correctly', () => {
  test('renders app correctly', async () => {
    await act(async () => render(<App />));
    const appElement = screen.getByTestId('app');
    expect(appElement).toBeInTheDocument();
  });

  test('renders Home page when on default path', async () => {
    await act(async () => render(<App />));
    const homeElement = screen.getByTestId('home');
    expect(homeElement).toBeInTheDocument();
  });
});
