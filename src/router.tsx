import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import SpeciesDetail from './components/SpeciesDetail/SpeciesDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/species/:id',
    element: <SpeciesDetail />
  }
]);

export default router;
