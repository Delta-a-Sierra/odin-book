import { createContext, Dispatch, useContext, useEffect, useReducer, useState } from "react";
import { usePreferences } from "../hooks/usePreferences";

interface ThemeContextInterface {
  state: ThemeState;
  dispatch: Dispatch<ThemeAction>;
}

type ThemeProviderProps = {
  children: React.ReactNode;
}

type ThemeState = {
  dark: boolean
  isLoading: boolean
}

type ThemeAction = {
  type: string
}

const ThemeContext = createContext<ThemeContextInterface | undefined>(undefined);

//TODO ADD IS LOADING
function ThemeReducer(state: ThemeState, action: ThemeAction) {
  switch (action.type) {
    case "toggle": {
      return { ...state, dark: !state.dark };
    }
    case "toggleLoad": {
      return { ...state, isLoading: !state.isLoading }
    }
    default: {
      return state
    }
  }
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { preferences, updatePreferences } = usePreferences()
  const [state, dispatch] = useReducer(ThemeReducer, { dark: preferences.theme.dark, isLoading: true });

  useEffect(() => {
    if (preferences.theme.dark != state.dark) {
      updatePreferences({ ...preferences, theme: { dark: state.dark } })
    }
  }, [state])

  useEffect(() => {
    if (preferences.theme.dark != state.dark) {
      dispatch({ type: 'toggle' })
    }
  }, [preferences])

  const value = { state, dispatch };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { ThemeProvider, useTheme };
