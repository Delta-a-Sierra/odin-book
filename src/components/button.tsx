type buttonProps = {
  text: string
  textColor?: string
  bgColor?: string
}

export const Button: React.FC<buttonProps> = ({ text, textColor, bgColor }) => {
  return (
    <button className={`${textColor && `text-${textColor}`}  ${bgColor ? `bg-${bgColor}` : 'bg-primary'} py-1 px-4 rounded-full`}>{text}</button>
  )
}
