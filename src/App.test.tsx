import { render, screen } from '@testing-library/react';
import App from './App';
import { expect, test } from 'vitest';

test('renders vite and react logos', () => {
  render(<App />);
  const viteLogo = screen.getByAltText(/Vite logo/i);
  const reactLogo = screen.getByAltText(/React logo/i);
  expect(viteLogo).toBeDefined();
  expect(reactLogo).toBeDefined();
});
