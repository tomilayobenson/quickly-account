import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import store from '../../shared/Store';
import Signup from '../../views/Signup';

test('renders signup form', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    </Provider>
  );
  const linkElement = screen.getByTestId('signup-component')
  expect(linkElement).toBeInTheDocument();
});
