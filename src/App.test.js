import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import store from './shared/Store';
import App from './App';

test('renders app component', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
  const linkElement = screen.getByTestId('nav-menu')
  expect(linkElement).toBeInTheDocument();
});
