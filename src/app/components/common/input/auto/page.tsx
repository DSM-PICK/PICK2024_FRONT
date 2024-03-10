"use client";

import React, { useState } from "react";
import SelectedBadges from "./badge/page";

interface ChangeProps {
  text: string;
  name: string;
}

interface InputProps {
  placeholder?: string;
  width?: string;
  name?: string;
  onChange: ({ text, name }: ChangeProps) => void;
  value: string;
}

export const AutoInput: React.FC<InputProps> = ({
  placeholder,
  width,
  onChange,
  value,
  name = "",
}) => {
  const [isAutoCompleteVisible, setIsAutoCompleteVisible] =
    useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const containerClassName = `font-sans w-${width} h-auto border border-neutral-900 rounded flex justify-between items-center px-2 bg-neutral-900 hover:border-neutral-500 hover:bg-white active:border-secondary-500 caret-primary-500 focus:border-secondary-500`;

  const data = [
    "1101 ㅂ각",
    "1102 ㅇㅇㅇ",
    "1103 ㅇㅇㅇ",
    "1104 ooo",
    "1105 ㄹㄹㄹ",
  ];

  const inputClassName =
    "h-10 px-2 border-none bg-transparent placeholder-neutral-500 focus:outline-none rounded font-sans";

  const handleInputChange = (inputText: string) => {
    const filtered = data.filter((item) =>
      item.toLowerCase().includes(inputText.toLowerCase())
    );
    setFilteredData(filtered);
    setIsAutoCompleteVisible(true);

    onChange({ text: inputText, name });
  };

  const handleSelectOption = (selectedOption: string) => {
    onChange({ text: selectedOption, name });
    setIsAutoCompleteVisible(false);

    setSelectedValues((prevValues) => [...prevValues, selectedOption]);

    onChange({ text: "", name });
  };

  const handleRemoveBadge = (value: string) => {
    setSelectedValues((prevValues) => prevValues.filter((v) => v !== value));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-start relative">
        <div className={containerClassName}>
          <input
            className={inputClassName}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>
        {isAutoCompleteVisible && (
          <div className="absolute top-full left-0 bg-white border rounded-lg w-full text-Button-S z-20">
            {filteredData.map((option) => (
              <div
                key={option}
                onClick={() => handleSelectOption(option)}
                className=" flex py-2 px-3 hover:bg-primary-200 hover:text-white cursor-pointer"
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <SelectedBadges
          selectedValues={selectedValues}
          onRemoveBadge={handleRemoveBadge}
        />
      </div>
    </div>
  );
};
