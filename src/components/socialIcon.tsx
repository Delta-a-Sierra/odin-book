import { FaDiscord, FaFacebookF, FaGoogle } from "react-icons/fa"

type socialIconProps = {
  size?: 'base',
  color?: string,
  bgColor?: string,
  type: 'facebook' | 'google' | 'discord'
  onClick?: () => void
}

export const SocialIcon: React.FC<socialIconProps> = ({ bgColor, color, size, type, onClick }) => {
  const circlSizes = {
    base: "w-10 h-10"
  }
  const iconSizes = {
    base: "1.5"
  }
  return (
    <div onClick={onClick} className={` bg-${bgColor ?? 'primary'}  ${!size && circlSizes.base}   flex items-center justify-center rounded-full`}>
      {type === "google" && (
        <FaGoogle color={color ?? 'white'} size={`${!size && iconSizes.base}em`} />
      )}
      {type === "facebook" && (
        <FaFacebookF color={color ?? 'white'} size={`${!size && iconSizes.base}em`} />
      )}
      {type === "discord" && (
        <FaDiscord color={color ?? 'white'} size={`${!size && iconSizes.base}em`} />
      )}
    </div>
  )
}
