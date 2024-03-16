"use client";

import React, { useState } from "react";
import Image from "next/image";
import eye from "../../../../assets/img/Icon/eye.svg";
import eyeOff from "../../../../assets/img/Icon/eyeOff.svg";

interface ChangeProps {
  text: string;
  name: string;
}

interface InputProps {
  label?: string;
  placeholder?: string;
  width?: string;
  type: string;
  name?: string;
  error?: boolean;
  onChange: ({ text, name }: ChangeProps) => void;
  disabled?: boolean;
  value: string;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  width,
  type,
  onChange,
  disabled,
  value,
  error,
  onKeyDown,
  name = "",
}) => {
  const [showOpen, setShowOpen] = useState<boolean>(false);

  const containerClassName = ` font-sans w-${width} h-auto border border-neutral-900 rounded flex justify-between items-center px-2
    ${
      error
        ? "border-error-500 bg-error-900"
        : disabled
        ? "bg-neutral-800 border-neutral-800"
        : "bg-neutral-900 hover:border-neutral-500 hover:bg-white active:border-secondary-500 caret-primary-500 focus:border-secondary-500"
    }
    `;

  const inputClassName = ` h-10 w-full px-2 border-none bg-transparent placeholder-neutral-500 
    focus:outline-none rounded font-sans
    `;

  return (
    <div className=" flex flex-col items-start">
      <label className=" font-sans text-label1 text-neutral-50">{label}</label>
      <div className={containerClassName}>
        <input
          className={inputClassName}
          type={type === "password" ? (showOpen ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange({ text: e.target.value, name })}
          disabled={disabled}
          onKeyDown={onKeyDown}
        />
        {type === "password" && (
          <div onClick={() => setShowOpen(!showOpen)} className="">
            {showOpen ? (
              <Image src={eye} alt="Eyes Open" />
            ) : (
              <Image src={eyeOff} alt="Eyes Close" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
