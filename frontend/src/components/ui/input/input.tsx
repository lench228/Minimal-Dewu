import React, { EventHandler } from "react";
import ErrorMessage from "./error";

interface iInput extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  handleLinkAdd?: (link: string) => void;
  error: string;
  label?: string;
  name: string;
}

const Input: React.FC<iInput> = ({
  placeholder,
  startIcon,
  endIcon,
  width,
  value,
  error,
  type,
  onChange,
  name,
  label,
}) => {
  return (
    <section className="flex gap-1 flex-col font-anonymous">
      <div
        style={{ width: width, height: "44px" }}
        className={` flex items-center gap-3 p-3 rounded-xl border-2 border-solid  border-white-darker-1 w-${width}`}
      >
        {startIcon && startIcon}
        <input
          className={`bg-[transparent]    text-2xl outline-none text-white-darker-1 w-full `}
          type={type ? type : "text"}
          style={{ width: width }}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />
        {endIcon && endIcon}
      </div>
      {error ? <ErrorMessage text={error} /> : null}
      {!error && label ? <p className={"pl-3 text-xl"}>{label} </p> : null}
    </section>
  );
};

export default Input;
