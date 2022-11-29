import React from 'react';
import { act, screen } from '@testing-library/react';
import services from '../../services/services';
import { getProjectsMockValue, getSpeciesDetailsMockValue, getSpeciesMockValue, preloadedState } from '../../__mockData__/mockData';
import { renderWithProviders } from '../../utils/test-utils';
import { BrowserRouter } from 'react-router-dom';
import SpeciesList from './SpeciesList';

beforeEach(() => {
  jest.spyOn(services, 'getProjects').mockResolvedValue(getProjectsMockValue);
  jest.spyOn(services, 'getSpecies').mockResolvedValue(getSpeciesMockValue);
  jest.spyOn(services, 'getSpeciesDetails').mockResolvedValue(getSpeciesDetailsMockValue);
});

describe('Species List Component', () => {
  test('Verify presence of components for list', async () => {
    // when
    await act(async () => renderWithProviders(<BrowserRouter><SpeciesList /></BrowserRouter>, { preloadedState }));
    // then
    const headerComponent = screen.getByTestId('list-header');
    const tableComponent = screen.getByTestId('species-table');
    expect(headerComponent).toBeInTheDocument();
    expect(tableComponent).toBeInTheDocument();
  });

  test('Verify presence of limit rows', async () => {
    // when
    await act(async () => renderWithProviders(<BrowserRouter><SpeciesList /></BrowserRouter>, { preloadedState }));
    // then
    const rowComponent = screen.getAllByTestId('list-row');
    expect(rowComponent).toHaveLength(preloadedState.species.all.length);
  });

  test('Verify display of error message if request limit is exhausted', async () => {
    // given
    preloadedState.request.counter = 0;
    // when
    await act(async () => renderWithProviders(<BrowserRouter><SpeciesList /></BrowserRouter>, { preloadedState }));
    // then
    const errorComponent = screen.getByTestId('limit-err');
    expect(errorComponent).toBeInTheDocument();
  });

  test('Verify display of error message', async () => {
    // given
    preloadedState.species = {
      ...preloadedState.species,
      error: 'Test Error'
    };
    // when
    await act(async () => renderWithProviders(<BrowserRouter><SpeciesList /></BrowserRouter>, { preloadedState }));
    // then
    const errorComponent = screen.getByTestId('list-err');
    expect(errorComponent).toBeInTheDocument();
  });
});
