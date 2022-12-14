type themeIconProps = {
  size?: string;
  color?: string;
};
import { useTheme } from "../contexts/theme";
import { FaMoon, FaSun } from "react-icons/fa";
import { useColor } from "../hooks/useColor";

export const ThemeIcon: React.FC<themeIconProps> = ({ color, size }) => {
  const colors = useColor();

  const { theme, toggleTheme } = useTheme();
  if (theme === 'dark') {
    return (
      <div onClick={toggleTheme}>
        <FaSun
          size={size ? size : "2em"}
          color={color ? color : colors.primary}
        />
      </div>
    );
  }
  return (
    <div onClick={toggleTheme}>
      <FaMoon
        size={size ? size : "2em"}
        color={color ? color : colors.accent}
      />
    </div>
  );
};
