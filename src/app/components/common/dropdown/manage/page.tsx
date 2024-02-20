import React, { useState } from "react";
import { CaretDown } from "@/assets/img/Icon/caret-down";

interface ManageDropProps {
  state: "출석" | "현체" | "귀가" | "취업" | "자퇴";
  third?: boolean;
}

interface ThirdStateStyles {
  출석: string;
  귀가: string;
  현체: string;
  취업: string;
  자퇴: string;
}

interface StateStyles {
  출석: string;
  귀가: string;
  현체: string;
  자퇴: string;
}

const ManageDrop: React.FC<ManageDropProps> = ({ state, third }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  let defaultOptions: Record<string, string> = {
    출석: "출석",
    귀가: "귀가",
    현체: "현체",
    자퇴: "자퇴",
  };

  let stateStyles: StateStyles = {
    출석: "bg-neutral-900 text-button-S text-neutral-300",
    귀가: "bg-primary-800 text-label1 text-white",
    현체: "bg-primary-500 text-button-S text-white",
    자퇴: "bg-error-400 text-label1 text-white",
  };

  if (third) {
    defaultOptions = {
      ...defaultOptions,
      취업: "취업",
    };

    stateStyles = {
      ...stateStyles,
      취업: "bg-tertiary-500 text-button-S text-white",
    };
  }

  const [selectedOption, setSelectedOption] = useState<string>(
    defaultOptions[state]
  );

  const stateStyle = stateStyles[selectedOption] || "";

  const IconColor = () => {
    return <CaretDown color={state === "출석" ? "#475467" : "white"} />;
  };

  const commonStyle =
    "py-3 px-2 rounded hover:bg-primary-200 hover:text-white text-neutral-400";

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);
  };

  const dropdownOptions = Object.keys(defaultOptions);

  return (
    <div
      className={`group relative rounded-lg py-2 px-3 ${stateStyle} flex gap-1 items-center cursor-pointer`}
      onClick={toggleDropdown}
    >
      <div>{selectedOption}</div>
      <div className="w-4 h-4">{IconColor()}</div>
      {isDropdownVisible && (
        <div className="absolute top-10 left-0 bg-white border rounded-lg w-full text-Button-S z-20">
          {dropdownOptions.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className={commonStyle}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageDrop;
