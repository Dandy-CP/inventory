export interface AuthBody {
  email: string;
  password: string;
}

export interface AuthSignUpBody {
  name: string;
  email: string;
  password: string;
}

export interface AuthSignUpResponse {
  message: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}
