import { useColor } from "../hooks/useColor"
import { Logo } from "./logo"
import { ThemeIcon } from "./themeIcon"

type logoandthemeheaderProps = {
}

export const LogoAndThemeHeader: React.FC<logoandthemeheaderProps> = () => {
  const colors = useColor()

  return (
    <header className="relative my-4 flex w-full items-center justify-center md:justify-start">

      <Logo width="70" />
      <div className="absolute flex w-full justify-end">
        <ThemeIcon color={colors.gray["400"]} size="1.5em" />
      </div>
    </header>
  )
}
