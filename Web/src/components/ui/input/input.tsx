import React from "react";
import ErrorMessage from "./error";
import clsx from "clsx";

interface iInput extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: string;
  label?: string;
  name: string;
  isFixed?: boolean;
}

const Input: React.FC<iInput> = ({
  placeholder,
  startIcon,
  endIcon,
  value,
  error,
  type,
  onChange,
  name,
  label,
  required,
  pattern,
  disabled,
  isFixed,
}) => {
  return (
    <section
      className={clsx(
        "flex gap-1 flex-col font-roboto w-full",
        disabled ? "opacity-50" : "",
      )}
    >
      <div
        className={clsx(
          `flex items-center gap-3 p-3 rounded-xl border-2 border-solid  border-white-darker-1 h-[44px] w-full`,
        )}
      >
        {startIcon && startIcon}
        <input
          className={`bg-[transparent] w-full text-lg sm:text-2xl outline-none text-white-darker-1`}
          type={type ? type : "text"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          pattern={pattern}
        />
        {endIcon && endIcon}
      </div>
      {error ? <ErrorMessage isFixed={isFixed} text={error} /> : null}
      {!error && label ? <p className={"pl-3 text-xl"}>{label} </p> : null}
    </section>
  );
};

export default Input;
