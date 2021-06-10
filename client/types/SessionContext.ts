import { SessionToken } from "./SessionToken";

export interface SessionContext {
  id: number;
  account_type: number;
  state: boolean;
  token: SessionToken;
}
