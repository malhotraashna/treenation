import React from 'react';
import { act, screen } from '@testing-library/react';
import services from '../../services/services';
import { getProjectsMockValue, getSpeciesDetailsMockValue, getSpeciesMockValue, preloadedState } from '../../__mockData__/mockData';
import { renderWithProviders } from '../../utils/test-utils';
import store from '../../store/store';
import { BrowserRouter } from 'react-router-dom';
import ProjectFilter from './ProjectFilter';

beforeEach(() => {
  jest.spyOn(services, 'getProjects').mockResolvedValue(getProjectsMockValue);
  jest.spyOn(services, 'getSpecies').mockResolvedValue(getSpeciesMockValue);
  jest.spyOn(services, 'getSpeciesDetails').mockResolvedValue(getSpeciesDetailsMockValue);
});

describe('Project Filter Component', () => {
  test('Verify Filter label', async () => {
    // when
    await act(async () => renderWithProviders(<BrowserRouter><ProjectFilter /></BrowserRouter>, { store }));
    // then
    const labelComponent = screen.getAllByText(/Treenation Project/i);
    expect(labelComponent).toHaveLength(2);
  });

  test('Verify Default project', async () => {
    // when
    await act(async () => renderWithProviders(<BrowserRouter><ProjectFilter /></BrowserRouter>, { preloadedState }));
    // then
    const projectSelectComponent = screen.getByTestId('project-select');
    expect(projectSelectComponent).toHaveTextContent(preloadedState.projects.all[0].name);
  });
});
