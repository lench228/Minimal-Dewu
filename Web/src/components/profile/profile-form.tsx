import React, { FormEvent, useEffect } from "react";
import Edit from "../../assets/icons/edit";
import { selectIsLoading } from "../popups/auth/model/auth.slice";
import { useSelector } from "react-redux";
import Loading from "../../assets/icons/loading";

interface FormProps {
  children?: React.ReactNode;
  title: string;
  description: string;
  onEditClick: () => void;
}

const FormContainer: React.FC<FormProps> = ({
  children,
  title,
  description,
  onEditClick,
}) => {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const isLoading = useSelector(selectIsLoading);

  return (
    <form
      onSubmit={(e) => {
        handleFormSubmit(e);
      }}
      className={
        "p-4 w-full flex items-center flex-col gap-4 border-black-light-2 border-[1px] bg-black-light rounded-xl overflow-y-scroll"
      }
    >
      <header className={"flex justify-start w-full gap-4 px-2 items-center "}>
        <div className={""}>
          <h2 className={"text-2xl text-white font-title"}>{title}</h2>
          <p
            className={
              "text-sm text-white-darker-2 border-b-[1px] border-black-light-2"
            }
          >
            {" "}
            {description}
          </p>
        </div>
        <Edit onClick={onEditClick}></Edit>
      </header>
      {children}
    </form>
  );
};

export default FormContainer;
