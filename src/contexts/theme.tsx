import { createContext, Dispatch, useContext, useReducer } from "react";

interface ThemeContextInterface {
  state: ThemeState;
  dispatch: Dispatch<ThemeAction>;
}

type ThemeProviderProps = {
  children: React.ReactNode;
}

type ThemeState = {
  dark: boolean
}

type ThemeAction = {
  type: string
}

const ThemeContext = createContext<ThemeContextInterface | undefined>(undefined);

function ThemeReducer(state: ThemeState, action: ThemeAction) {
  switch (action.type) {
    case "toggle": {
      return { dark: !state.dark };
    }
    default: {
      return state
    }
  }
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(ThemeReducer, { dark: false });

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
