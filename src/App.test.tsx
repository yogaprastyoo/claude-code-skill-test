import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';
import { expect, test } from 'vitest';

test('renders vite and react logos', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const viteLogo = screen.getByAltText(/Vite logo/i);
  const reactLogo = screen.getByAltText(/React logo/i);
  expect(viteLogo).toBeDefined();
  expect(reactLogo).toBeDefined();
});
