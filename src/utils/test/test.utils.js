import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import { rootReducer } from '../../store/root-reducer';
import { BrowserRouter } from 'react-router-dom';

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = createStore(rootReducer, preloadedState),
    ...renderOptions
  } = {}
) {
  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
