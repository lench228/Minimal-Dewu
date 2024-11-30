import React, { useState } from "react";
import Edit from "../../assets/icons/edit";

interface FormProps {
  children?: React.ReactNode;
  title: string;
  description: string;
}

const FormContainer: React.FC<FormProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <section
      className={
        "p-4 flex items-center flex-col gap-4 border-black-light-2 border-[1px] bg-black-light rounded-xl"
      }
    >
      <header className={"flex justify-start w-full gap-4 px-2 items-center "}>
        <div className={""}>
          <h2 className={"text-2xl text-white"}>{title}</h2>
          <p
            className={
              "text-sm text-white-darker-2 border-b-[1px] border-black-light-2"
            }
          >
            {" "}
            {description}
          </p>
        </div>
        <Edit></Edit>
      </header>

      {children}
    </section>
  );
};

export default FormContainer;
