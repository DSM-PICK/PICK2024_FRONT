"use client";

import React, { useState } from "react";

interface ChangeProps {
  text: string;
  name: string;
}

interface InputProps {
  placeholder?: string;
  width?: string;
  type: string;
  height?: string;
  name?: string;
  error?: boolean;
  onChange: ({ text, name }: ChangeProps) => void;
  disabled?: boolean;
  value: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TextArea: React.FC<InputProps> = ({
  placeholder,
  width,
  height,
  onChange,
  value,
  error,
  onKeyDown,
  disabled,
  name = "",
}) => {
  const containerClassName = `w-${width} h-${height} font-sans border border-neutral-900 rounded flex justify-between items-center px-2
    ${
      error
        ? "border-error-500 bg-error-900"
        : disabled
        ? "bg-neutral-800 border-neutral-800"
        : "bg-neutral-900 hover:border-neutral-500 hover:bg-white active:border-secondary-500 caret-primary-500 focus:border-secondary-500"
    }`;

  const inputClassName = `h-full py-4 w-full px-2 border-none bg-transparent placeholder-neutral-500 
    focus:outline-none rounded resize-none`;

  return (
    <div className="flex flex-col items-start">
      <div className={containerClassName}>
        <textarea
          className={inputClassName}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange({ text: e.target.value, name })}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default TextArea;
