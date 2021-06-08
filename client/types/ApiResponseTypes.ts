export interface UserLogin {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface User {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  address: string;
  account_type: number;
}
