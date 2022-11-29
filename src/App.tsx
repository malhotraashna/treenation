import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from './store/store';
import router from './router';
import './App.css';
import ErrorBoundary from './error-boundary.component';

const App = (): any => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div className="App" data-testid='app'>
          <RouterProvider router={router} />
        </div>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
