import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { EachSubjectData as reducerInitialState, memorandum } from './reducers/memorandum';
import { Provider } from 'react-redux';

function render(ui, {
  initialState = reducerInitialState.businessData['Statistic'],
  store = createStore(memorandum, initialState),
  ...renderOptions
} = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };