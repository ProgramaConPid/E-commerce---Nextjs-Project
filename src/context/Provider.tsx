"use client"

import { useState, JSX } from "react";
import { myContext, ContextProps } from "./Context";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Provider = ({children}: Props) => {
  const [userLogged, setUserLogged] = useState<ContextProps["userLogged"]>(null);

  return (
    <myContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </myContext.Provider>
  );
}