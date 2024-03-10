"use client";

import React, { useState } from "react";

interface StateDropProps {
  state: "신청" | "미신청" | "미응답";
}

export const ClassmealDrop: React.FC<StateDropProps> = ({ state }) => {
  const defaultOptions: Record<string, string> = {
    신청: state === "신청" ? "신청" : state === "미신청" ? "미신청" : "미응답",
  };

  const [selectedOption, setSelectedOption] = useState<string>(
    defaultOptions["신청"]
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const toggleDropdown = () => {
    if (state === "미응답") {
      setIsDropdownVisible(!isDropdownVisible);
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);
  };

  const dropStyle = () => {
    switch (state) {
      case "미응답":
        return "group border bg-white py-1 px-3 focus:border-primary-200 rounded-lg cursor-pointer flex items-center justify-center";
      case "미신청":
        return "bg-white py-1 border px-3 rounded-lg flex justify-center items-center border-primary-500 text-neutral-500";
      case "신청":
        return "bg-primary-300 py-1 px-3 rounded-lg flex justify-center items-center text-white";
    }
  };

  const commonStyle = "py-4 px-2 rounded hover:bg-primary-200 hover:text-white";

  return (
    <div className="relative w-24">
      <div className={dropStyle()} onClick={toggleDropdown}>
        {selectedOption}
      </div>
      {state === "미응답" && isDropdownVisible && (
        <div className="absolute z-10 bg-white border rounded-lg w-full text-Button-S">
          <div
            onClick={() => handleOptionClick("신청")}
            className={commonStyle}
          >
            신청
          </div>
          <div
            onClick={() => handleOptionClick("미신청")}
            className={commonStyle}
          >
            미신청
          </div>
        </div>
      )}
    </div>
  );
};
