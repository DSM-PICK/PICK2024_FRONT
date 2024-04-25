"use client";
import React, { useState, useEffect, useRef } from "react";
import { CaretDown } from "@/assets/img/Icon/caret-down";

interface ManageDropProps {
  state: string;
  third?: boolean;
  onChange: (option: string) => void;
}

interface StateStyles {
  [key: string]: string;
}

const ManageDrop: React.FC<ManageDropProps> = ({ state, third, onChange }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const defaultOptions: Record<string, string> = {
    출석: "출석",
    귀가: "귀가",
    현체: "현체",
    자퇴: "자퇴",
    취업: "취업",
  };

  // let stateStyles: StateStyles = {
  //   출석: "bg-neutral-900 text-button-S text-neutral-300",
  //   귀가: "bg-primary-800 text-label1 text-white",
  //   현체: "bg-primary-500 text-button-S text-white",
  //   자퇴: "bg-error-400 text-label1 text-white",
  //   취업: "bg-tertiary-500 text-button-S text-white",
  // };

  const ChangeStyle = (option: string) => {
    switch (option) {
      case "출석":
        return "bg-neutral-900 text-button-S text-neutral-300";
      case "귀가":
        return "bg-primary-800 text-label1 text-white";
      case "현체":
        return "bg-primary-500 text-button-S text-white";
      case "자퇴":
        return "bg-error-400 text-label1 text-white";
      case "취업":
        return "bg-tertiary-500 text-button-S text-white";
    }
  };

  const arrow = (option: string) => {
    if (option === "출석") return `#475467`;
    return `white`;
  };

  if (!third) {
    delete defaultOptions.취업;
  }

  const IconColor = () => {
    return <CaretDown color={arrow(selectedOption)} />;
  };

  const commonStyle =
    "py-3 px-2 rounded hover:bg-primary-200 hover:text-white text-neutral-400";

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);
    onChange(optionRename(option));
    ChangeStyle(option);
  };

  const optionRename = (option: string) => {
    switch (option) {
      case "출석":
        return `ATTENDANCE`;
      case "귀가":
        return `GO_HOME`;
      case "취업":
        return "EMPLOYMENT";
      case "현체":
        return "PICNIC";
      case "자퇴":
        return "DROPOUT";
      default:
        return "";
    }
  };

  const dropdownOptions = Object.keys(defaultOptions);

  useEffect(() => {
    setSelectedOption(defaultOptions[state]);
  }, [state]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedOption(defaultOptions[state]);
  }, [state]);

  return (
    <div
      className={`group relative rounded-lg py-2 px-3  ${ChangeStyle(
        selectedOption
      )} flex gap-1 items-center cursor-pointer`}
      onClick={toggleDropdown}
      ref={dropdownRef}
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
