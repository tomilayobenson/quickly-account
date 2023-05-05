import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import store from '../../shared/Store';
import Login from '../../views/Login';

test('renders login form', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );
  const linkElement = screen.getByTestId('login-component')
  expect(linkElement).toBeInTheDocument();
});
