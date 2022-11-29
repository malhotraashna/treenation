import React from 'react';
import { act, screen } from '@testing-library/react';
import services from '../../services/services';
import { getProjectsMockValue, getSpeciesDetailsMockValue, getSpeciesMockValue } from '../../__mockData__/mockData';
import Home from './Home';
import { renderWithProviders } from '../../utils/test-utils';
import store from '../../store/store';
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
  jest.spyOn(services, 'getProjects').mockResolvedValue(getProjectsMockValue);
  jest.spyOn(services, 'getSpecies').mockResolvedValue(getSpeciesMockValue);
  jest.spyOn(services, 'getSpeciesDetails').mockResolvedValue(getSpeciesDetailsMockValue);
});

describe('Home page is rendered correctly', () => {
  test('Header is present', async () => {
    // when
    await act(async () => renderWithProviders(<BrowserRouter><Home /></BrowserRouter>, { store }));
    // then
    const headerElement = screen.getByTestId('home');
    expect(headerElement).toBeInTheDocument();
  });

  test('Verify presence of Project Filter and Counter components', async () => {
    // when
    await act(async () => renderWithProviders(<BrowserRouter><Home /></BrowserRouter>, { store }));
    // then
    const filterComponent = screen.getByTestId('project-filter');
    const counterComponent = screen.getByTestId('request-counter');
    expect(filterComponent).toBeInTheDocument();
    expect(counterComponent).toBeInTheDocument();
  });

  test('Verify presenct of Species List component', async () => {
    // when
    await act(async () => renderWithProviders(<BrowserRouter><Home /></BrowserRouter>, { store }));
    // then
    const listComponent = screen.getByTestId('species-list');
    expect(listComponent).toBeInTheDocument();
  });
});
