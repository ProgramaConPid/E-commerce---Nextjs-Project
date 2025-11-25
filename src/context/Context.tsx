"use client"

import { createContext } from "react";

export interface UserLoggedProps {
  id: string;
  name: string;
  email: string;
}

export type ContextProps = {
  userLogged: UserLoggedProps | null;
  setUserLogged: (user: UserLoggedProps | null) => void;
};

export const myContext = createContext<ContextProps>({} as ContextProps);