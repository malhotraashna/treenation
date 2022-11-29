import React from 'react';
import { act, screen } from '@testing-library/react';
import services from '../../services/services';
import { getProjectsMockValue, getSpeciesDetailsMockValue, getSpeciesMockValue, preloadedState } from '../../__mockData__/mockData';
import { renderWithProviders } from '../../utils/test-utils';
import { BrowserRouter } from 'react-router-dom';
import RequestCounter from './RequestCounter';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  jest.spyOn(services, 'getProjects').mockResolvedValue(getProjectsMockValue);
  jest.spyOn(services, 'getSpecies').mockResolvedValue(getSpeciesMockValue);
  jest.spyOn(services, 'getSpeciesDetails').mockResolvedValue(getSpeciesDetailsMockValue);
});

describe('Request Counter Component', () => {
  test('Verify counter and button are present on UI', async () => {
    // when
    await act(async () => renderWithProviders(<BrowserRouter><RequestCounter /></BrowserRouter>, { preloadedState }));
    // then
    const counterComponent = screen.getByTestId('counter-val');
    const addButtonComponent = screen.getByTestId('add-request');
    expect(counterComponent).toBeInTheDocument();
    expect(addButtonComponent).toBeInTheDocument();
  });

  test('Verify value for counter', async () => {
    // when
    await act(async () => renderWithProviders(<BrowserRouter><RequestCounter /></BrowserRouter>, { preloadedState }));
    // then
    const counterComponent = screen.getByTestId('counter-val');
    expect(counterComponent).toHaveTextContent(preloadedState.request.counter.toString());
  });

  test('Verify Add Request button click', async () => {
    // given
    await act(async () => renderWithProviders(<BrowserRouter><RequestCounter /></BrowserRouter>, { preloadedState }));
    // then
    const counterComponent = screen.getByTestId('counter-val');
    const addButtonComponent = screen.getByTestId('add-request');
    expect(counterComponent).toHaveTextContent(preloadedState.request.counter.toString());
    await act(async () => userEvent.click(addButtonComponent));
    expect(counterComponent).toHaveTextContent((preloadedState.request.counter + 30).toString());
  });
});
