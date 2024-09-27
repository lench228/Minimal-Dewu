import { EventHandler } from "react";
import ErrorMessage from "./error";

interface iInput extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error: string;
}

const Input: React.FC<iInput> = ({
  placeholder,
  startIcon,
  endIcon,
  width,
  value,
  error,
  onChange,
}) => {
  return (
    <section className="flex gap-4 flex-col">
      <div
        style={{ width: width }}
        className={` flex items-center gap-3 p-3 rounded-xl border-2 border-solid  border-white-darker-1 w-${width}`}
      >
        {startIcon && startIcon}
        <input
          className={`bg-[#2b2b2b]  font-anonymous text-2xl outline-none text-white-darker-2 opacity-50 w-full `}
          type={"text"}
          style={{ width: width }}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {endIcon && endIcon}
      </div>
      {error && <ErrorMessage text={error} />}
    </section>
  );
};

export default Input;
