import { render, screen } from '@testing-library/react';
import App from './App';

test('Render the app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Register/i);
  expect(linkElement).toBeInTheDocument();
});
