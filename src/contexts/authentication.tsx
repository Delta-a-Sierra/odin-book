import { getSession } from "next-auth/react";
import { FC, useContext, React, useEffect, useState, createContext, FunctionComponent, ReactChildren } from "react";

interface AuthContextInterface {
  authenticated: boolean;
  isLoading?: boolean;
}

type AuthProps = {
  children?: React.ReactNode
}

const authContext = createContext<AuthContextInterface | undefined>(undefined)

export function AuthProvider({ children }: AuthProps) {
  const [state, setState] = useState({ authenticated: false, isLoading: false })

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession()
      if (!session) {
        setState({ authenticated: false, isLoading: false })
      }
      setState({ authenticated: true, isLoading: false })
    }
    setState(prev => ({ ...prev, isLoading: true }))
    securePage()
  }, [])
  return (
    <authContext.Provider value={state}>{children} </authContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

