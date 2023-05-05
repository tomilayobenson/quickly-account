import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import store from '../../shared/Store';
import Profile from '../../views/Profile';

test('renders profile page', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    </Provider>
  );
  const linkElement = screen.getByTestId('profile-view')
  expect(linkElement).toBeInTheDocument();
});
