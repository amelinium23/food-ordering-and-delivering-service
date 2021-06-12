export interface SessionToken {
  access_token: string;
  refresh_token: string;
}

export interface SessionContext {
  id: number;
  account_type: number;
  state: boolean;
  token: SessionToken;
}
