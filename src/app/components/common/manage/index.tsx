"use client";

import React, { useState, useEffect } from "react";
import { CaretDown } from "@/assets/img/Icon/caret-down";
import { ChangeState } from "@/apis/weekendMeal";

interface ManageDropProps {
  state: string;
  third?: boolean;
}

interface StateStyles {
  출석: string;
  귀가: string;
  현체: string;
  자퇴: string;
  취업: string;
}

const ManageDrop: React.FC<ManageDropProps> = ({ state, third }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const { mutate: changeStatusMutate } = ChangeState();

  let defaultOptions: Record<string, string> = {
    출석: "출석",
    귀가: "귀가",
    현체: "현체",
    자퇴: "자퇴",
    취업: "취업",
  };

  let stateStyles: StateStyles = {
    출석: "bg-neutral-900 text-button-S text-neutral-300",
    귀가: "bg-primary-800 text-label1 text-white",
    현체: "bg-primary-500 text-button-S text-white",
    자퇴: "bg-error-400 text-label1 text-white",
    취업: "bg-tertiary-500 text-button-S text-white",
  };

  if (!third) {
    delete defaultOptions.취업;
  }

  const IconColor = () => {
    return <CaretDown color={state === "ATTENDANCE" ? "#475467" : "white"} />;
  };

  const commonStyle =
    "py-3 px-2 rounded hover:bg-primary-200 hover:text-white text-neutral-400";

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);
  };

  const dropdownOptions = Object.keys(defaultOptions);

  useEffect(() => {
    setSelectedOption(defaultOptions[state]);
  }, [state]);

  return (
    <div
      className={`group relative rounded-lg py-2 px-3 ${stateStyles} flex gap-1 items-center cursor-pointer`}
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
