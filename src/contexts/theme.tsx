import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeContextInterface {
  theme: ThemeState;
  toggleTheme: () => void
}

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeState = 'light' | 'dark' | null;


const ThemeContext = createContext<ThemeContextInterface | undefined>(
  undefined
);


const loadTheme = () => {
  const theme = localStorage.getItem('theme')
  return theme as ThemeState
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeState>(null);

  useEffect(() => {
    setTheme(loadTheme())
  }, [])

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
      return
    }
    localStorage.setItem('theme', 'light')
    setTheme('light')
  }

  const value: ThemeContextInterface = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { ThemeProvider, useTheme };
