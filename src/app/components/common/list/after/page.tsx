"use client";

import React, { useState } from "react";
import { CaretDown } from "@/assets/img/Icon/caret-down";

interface AfterCheckProp {
  state: "출석" | "이동" | "외출" | "무단" | "현체";
  day: 3 | 5;
  edit?: boolean;
}

export const AfterCheck: React.FC<AfterCheckProp> = ({ state, day, edit }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(state);

  const style = () => {
    switch (selectedOption) {
      case "출석":
        return "text-neutral-100";
      case "무단":
        return "border border-error-500 text-error-500";
      case "외출":
        return "border border-primary-500 text-primary-500";
      case "이동":
        return "border border-primary-600 text-primary-600";
      default:
        return "";
    }
  };

  const width = () => {
    switch (day) {
      case 3:
        return "w-60";
      case 5:
        return "w-30";
      default:
        return "";
    }
  };

  const commonStyle =
    "text-button-S w-full py-4 px-2 hover:bg-primary-200 hover:text-white";

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const ArrowColor = () => {
    switch (selectedOption) {
      case "무단":
        return "#E46962";
      case "외출":
        return "#9650FA";
      case "이동":
        return "#AA71FB";
      case "출석":
        return "#475467";
      default:
        return undefined;
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);
  };

  return state === "현체" ? (
    <div
      className={`${width()} h-max p-4 text-label1 text-neutral-400 rounded-lg bg-white`}
    >
      {state}
    </div>
  ) : (
    <div
      className={`relative h-max group p-4 bg-white rounded-lg text-label1 flex justify-between items-center ${style()} ${width()}`}
      onClick={toggleDropdown}
    >
      <div>{selectedOption}</div>
      {edit && (
        <div className="w-4 h-4">
          <CaretDown color={ArrowColor()} />
        </div>
      )}

      {isDropdownVisible && edit && (
        <div className="absolute z-10 w-full left-0 top-16 items-center flex flex-col rounded-lg bg-white">
          <div
            className={`text-neutral-50 ${commonStyle}`}
            onClick={() => handleOptionClick("출석")}
          >
            출석
          </div>
          <div
            className={`text-neutral-50 ${commonStyle}`}
            onClick={() => handleOptionClick("이동")}
          >
            이동
          </div>
          <div
            className={`text-neutral-50 ${commonStyle}`}
            onClick={() => handleOptionClick("외출")}
          >
            외출
          </div>
          <div
            className={`${commonStyle} text-error-400`}
            onClick={() => handleOptionClick("무단")}
          >
            무단
          </div>
        </div>
      )}
    </div>
  );
};
