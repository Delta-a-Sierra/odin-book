import { FormEvent } from "react";

type buttonProps = {
  text: string;
  textColor?: string;
  bgColor?: string;
  onClick: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  type?: string;
};

export const Button: React.FC<buttonProps> = ({ text, textColor, bgColor }) => {
  return (
    <button
      className={`${textColor && `text-${textColor}`}  ${bgColor ? `bg-${bgColor}` : "bg-primary"
        } rounded-full py-2 px-8`}
    >
      {text}
    </button>
  );
};
