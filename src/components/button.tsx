
type buttonProps = {
  text: string;
  textColor?: string;
  bgColor?: string;
  onClick: () => void
  type?: string;
};

export const Button: React.FC<buttonProps> = ({ text, textColor, bgColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${textColor && `text-${textColor}`}  bg-${bgColor ?? 'primary'} rounded-full py-2 px-8`}
    >
      {text}
    </button>
  );
};
