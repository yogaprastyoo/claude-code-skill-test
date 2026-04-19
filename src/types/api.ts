export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ValidationErrors = {
  [field: string]: string[];
};

export type ValidationException = {
  message: string;
  errors: ValidationErrors;
};

export type AuthenticationException = {
  message: string;
};
