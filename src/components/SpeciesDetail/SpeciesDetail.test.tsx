import React from 'react';
import { act, screen } from '@testing-library/react';
import services from '../../services/services';
import { getProjectsMockValue, getSpeciesDetailsMockValue, getSpeciesMockValue, preloadedState } from '../../__mockData__/mockData';
import { renderWithProviders } from '../../utils/test-utils';
import { BrowserRouter } from 'react-router-dom';
import SpeciesDetail from './SpeciesDetail';

beforeEach(() => {
  jest.spyOn(services, 'getProjects').mockResolvedValue(getProjectsMockValue);
  jest.spyOn(services, 'getSpecies').mockResolvedValue(getSpeciesMockValue);
  jest.spyOn(services, 'getSpeciesDetails').mockResolvedValue(getSpeciesDetailsMockValue);
});

describe('Species Detail Component', () => {
  test('Verify presence of high level components', async () => {
    // when
    await act(async () => renderWithProviders(<BrowserRouter><SpeciesDetail /></BrowserRouter>, { preloadedState }));
    // then
    const navComponent = screen.getByTestId('home-nav');
    const headerComponent = screen.getByTestId('detail-header-name');
    const contentComponent = screen.getByTestId('detail-content');
    expect(navComponent).toBeInTheDocument();
    expect(headerComponent).toBeInTheDocument();
    expect(contentComponent).toBeInTheDocument();
  });

  test('Verify data components for detail content', async () => {
    // when
    await act(async () => renderWithProviders(<BrowserRouter><SpeciesDetail /></BrowserRouter>, { preloadedState }));
    // then
    const imageComponent = screen.getByTestId('sp-image');
    const nameComponent = screen.getByTestId('sp-name');
    const categoryComponent = screen.getByTestId('sp-category');
    const originComponent = screen.getByTestId('sp-origin');
    const foliageComponent = screen.getByTestId('sp-foliage');
    const stockComponent = screen.getByTestId('sp-stock');
    const priceComponent = screen.getByTestId('sp-price');
    const descriptionComponent = screen.getByTestId('sp-des');
    expect(imageComponent).toBeInTheDocument();
    expect(nameComponent).toBeInTheDocument();
    expect(categoryComponent).toBeInTheDocument();
    expect(originComponent).toBeInTheDocument();
    expect(foliageComponent).toBeInTheDocument();
    expect(stockComponent).toBeInTheDocument();
    expect(priceComponent).toBeInTheDocument();
    expect(descriptionComponent).toBeInTheDocument();
  });

  test('Verify error message is displayed when request limit is exhausted', async () => {
    // given
    preloadedState.request.counter = 0;
    // when
    await act(async () => renderWithProviders(<BrowserRouter><SpeciesDetail /></BrowserRouter>, { preloadedState }));
    // then
    const errorComponent = screen.getByTestId('sp-error');
    const noDataComponent = screen.getByTestId('no-data');
    expect(errorComponent).toBeInTheDocument();
    expect(noDataComponent).toBeInTheDocument();
  });

  test('Verify error message is displayed in case of any error', async () => {
    // given
    preloadedState.species.error = 'Test Error';
    // when
    await act(async () => renderWithProviders(<BrowserRouter><SpeciesDetail /></BrowserRouter>, { preloadedState }));
    // then
    const errorComponent = screen.getByTestId('sp-error');
    const noDataComponent = screen.getByTestId('no-data');
    expect(errorComponent).toBeInTheDocument();
    expect(noDataComponent).toBeInTheDocument();
  });
});
