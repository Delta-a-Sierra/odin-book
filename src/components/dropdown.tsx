import { ChangeEventHandler, FocusEventHandler, MouseEventHandler, useEffect, useRef, useState } from "react";

type dropdownProps = {
  name: string;
  value: string | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
  errorMsg?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  touched: boolean | undefined;
  placeholder: string;
  content: string[]
  formik: any
};

export const DropDown: React.FC<dropdownProps> = ({
  name,
  value,
  onChange,
  onBlur,
  errorMsg,
  touched,
  placeholder,
  content,
  formik
}) => {
  const [dropDownVisible, setDropDownVisible] = useState(false)
  const [shownContent, setShowContent] = useState(content)
  const inputEl = useRef(null)

  useEffect(() => {

    const temp = content.filter(item => {
      if (!value) {
        return true
      }
      if (item.match(value)) {
        return true
      }
      return false
    })
    setShowContent(temp)
  }, [value])

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.name !== inputEl.current.name) {
        setDropDownVisible(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [dropDownVisible === true])


  const handleDropDownSelect = (e: any) => {
    formik.setFieldValue(name, e.target.innerHTML)
    setDropDownVisible(false)
  }


  return (
    <div className="w-full h-fit relative">
      <label
        onClick={() => { setDropDownVisible(true) }}
        htmlFor={name}
        className={`${touched && errorMsg && !dropDownVisible && "border border-red-500"} flex w-full items-center space-x-3 ${dropDownVisible ? 'rounded-t-md' : 'rounded-full'} bg-gray-200 dark:bg-dark-300 px-4 py-3 text-sm md:text-base lg:text-xl xl:text-2xl`}
      >
        <input
          ref={inputEl}
          className="w-full bg-transparent outline-none dark:text-white relative"
          type={"text"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </label>
      {dropDownVisible ? (
        <ul className={` absolute z-10 top-full flex flex-col gap-y-1 left-0 w-full max-h-28 gray-200 dark:bg-dark-300 text-center dark:text-gray-400 overflow-y-scroll py-2 shadow-md`}>
          {shownContent.length > 0 ? (shownContent.map((item, i) => {
            return <li onClick={handleDropDownSelect} className="hover:bg-dark-800 py-1" key={`${i}${item}`}>{item}</li>
          })) : (<li className="hover:bg-dark-800 py-1" key='0'>No Matches</li>)}
        </ul>
      ) : (
        <p
          className={`${touched && errorMsg ? "visible" : "invisible"
            } font-nunito mt-1 text-xs text-center tracking-wider text-red-500 lg:text-base xl:text-lg`}
        >
          {errorMsg || 'empty'}
        </p>
      )}
    </div>
  );
};
