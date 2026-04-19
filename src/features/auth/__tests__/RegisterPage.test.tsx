import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import RegisterPage from '../pages/RegisterPage';

vi.mock('../hooks', () => ({
  useCurrentUser: () => ({ data: null, isLoading: false, isError: false }),
  useRegister: () => ({
    mutateAsync: vi.fn().mockResolvedValue({}),
    isPending: false,
  }),
}));

function renderRegisterPage() {
  const user = userEvent.setup();
  const utils = render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );
  return { user, ...utils };
}

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields', () => {
    renderRegisterPage();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  it('renders create account button', () => {
    renderRegisterPage();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('renders link to login page', () => {
    renderRegisterPage();
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows validation error when fields are empty', async () => {
    const { user } = renderRegisterPage();
    await user.click(screen.getByRole('button', { name: /create account/i }));
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
  });

  it('shows error when passwords do not match', async () => {
    const { user } = renderRegisterPage();
    await user.type(screen.getByLabelText('Name'), 'John');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.type(screen.getByLabelText('Confirm Password'), 'different123');
    await user.click(screen.getByRole('button', { name: /create account/i }));
    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  it('toggles password visibility', async () => {
    const { user } = renderRegisterPage();
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');
    const toggleBtns = screen.getAllByRole('button', { name: /show password/i });
    await user.click(toggleBtns[0]);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});
