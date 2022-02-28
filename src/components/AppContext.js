import { createContext } from "react";

export const AppContext = createContext({
  userContext: [user, setUser],
  loggedInContext: [loggedIn, setLoggedIn],
  userIdContext: [userId, setUserId],
});
