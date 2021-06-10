import * as React from "react";
import { SessionContext as SessionContextType } from "../types/SessionContext";

const UserContext = React.createContext<
  [SessionContextType, (session: SessionContextType) => void]
>([
  {
    id: 0,
    account_type: 1,
    state: false,
    token: {
      access_token: "",
      refresh_token: "",
    },
  },
  () => {},
]);

export const UserProvider = UserContext.Provider;

export default UserContext;
