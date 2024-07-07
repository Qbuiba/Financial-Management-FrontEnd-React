import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Login';

describe('Login Page', () => {
  test('renders the Username label', () => {
    render(
      <MemoryRouter>
        <Login onLogin={() => {}} />
      </MemoryRouter>
    );

    const usernameLabel = screen.getByText('Username');
    expect(usernameLabel).toBeInTheDocument();
  });
});
