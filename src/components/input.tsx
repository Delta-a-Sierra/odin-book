import { ChangeEventHandler, FocusEventHandler } from "react";
import { MdEmail } from "react-icons/md";
import { MdPassword } from "react-icons/md";

type inputProps = {
  name: string;
  value: string | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
  errorMsg?: string;
  onBlur: FocusEventHandler<HTMLInputElement>;
  touched: boolean | undefined;
  type?: string;
  placeholder: string;
};

export const Input: React.FC<inputProps> = ({
  name,
  value,
  onChange,
  onBlur,
  errorMsg,
  touched,
  type,
  placeholder,
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor="email"
        className={`${errorMsg ? "border border-red-500" : ""
          } flex w-full items-center space-x-3 rounded-full bg-gray-200 px-4 py-3 text-sm md:text-base lg:text-xl xl:text-2xl`}
      >
        {type === "email" && <MdEmail size="1.4em" color="#7F7F7F" />}
        {type === "password" && <MdPassword size="1.4em" color="#7F7F7F" />}
        <input
          className="w-full bg-gray-200 outline-none"
          type={type ?? "text"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </label>
      <p
        className={`${touched && errorMsg ? "inline visible" : "invisible"
          } font-nunito mt-1 ml-5 text-xs tracking-wider text-red-500 lg:text-base xl:text-lg`}
      >
        {errorMsg || 'empty'}
      </p>
    </div>
  );
};
