import { SessionToken } from "./SessionToken";

export interface SessionContext {
  state: boolean;
  token: SessionToken;
}
