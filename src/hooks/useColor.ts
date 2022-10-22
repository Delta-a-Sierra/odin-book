
import resolveConfig from "tailwindcss/resolveConfig";
import { Config } from "tailwindcss/types/config.js";
import tailwindConfig from "../../tailwind.config.cjs";

const colors = resolveConfig(tailwindConfig as Config) as any

export const useColor = () => {
  return (colors.theme?.colors)
}
