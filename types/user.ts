export interface User {
  email: string;
  username: string;
  avatar?: string;
}

export interface RegisterUserData {
  email: string;
  password: string;
}