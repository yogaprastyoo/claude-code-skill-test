import { describe, it, expect } from 'vitest';
import { loginSchema, registerSchema } from '../schemas';

describe('loginSchema', () => {
  it('accepts valid input', () => {
    const result = loginSchema.safeParse({ email: 'test@example.com', password: 'secret' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = loginSchema.safeParse({ email: 'not-an-email', password: 'secret' });
    expect(result.success).toBe(false);
  });

  it('rejects empty password', () => {
    const result = loginSchema.safeParse({ email: 'test@example.com', password: '' });
    expect(result.success).toBe(false);
  });

  it('rejects missing fields', () => {
    const result = loginSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe('registerSchema', () => {
  const valid = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    password_confirmation: 'password123',
  };

  it('accepts valid input', () => {
    expect(registerSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects name longer than 255 chars', () => {
    const result = registerSchema.safeParse({ ...valid, name: 'a'.repeat(256) });
    expect(result.success).toBe(false);
  });

  it('rejects email longer than 255 chars', () => {
    const result = registerSchema.safeParse({ ...valid, email: 'a'.repeat(251) + '@x.co' });
    expect(result.success).toBe(false);
  });

  it('rejects password shorter than 8 chars', () => {
    const result = registerSchema.safeParse({
      ...valid,
      password: 'short',
      password_confirmation: 'short',
    });
    expect(result.success).toBe(false);
  });

  it('rejects mismatched password_confirmation', () => {
    const result = registerSchema.safeParse({
      ...valid,
      password_confirmation: 'different123',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((e) => e.path.join('.'));
      expect(fields).toContain('password_confirmation');
    }
  });

  it('rejects invalid email format', () => {
    const result = registerSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });
});
