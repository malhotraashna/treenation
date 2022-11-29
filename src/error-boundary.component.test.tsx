import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './error-boundary.component';
import '@testing-library/jest-dom';

describe('Error Boundary', () => {
  test('Error Boundary', () => {
    const ThrowError = (): any => {
      throw new Error('Test');
    };

    render(
      <ErrorBoundary fallback={<ErrorBoundary />}>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByTestId('errorboundary')).toBeVisible();
  });
});
