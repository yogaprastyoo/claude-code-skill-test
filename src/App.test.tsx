import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import App from './App';
import { expect, test } from 'vitest';

vi.mock('@/features/auth/hooks', () => ({
  useCurrentUser: () => ({ data: null, isLoading: false, isError: true }),
  useLogin: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useRegister: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useLogout: () => ({ mutate: vi.fn(), isPending: false }),
}));

function renderApp(initialEntries = ['/login']) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

test('renders login page at /login', () => {
  renderApp(['/login']);
  expect(screen.getByText('Welcome back')).toBeInTheDocument();
});

test('renders register page at /register', () => {
  renderApp(['/register']);
  expect(screen.getByText('Create an account')).toBeInTheDocument();
});
