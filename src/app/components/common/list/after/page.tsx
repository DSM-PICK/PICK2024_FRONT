"use client";
import React, { useEffect, useRef, useState } from "react";
import { CaretDown } from "@/assets/img/Icon/caret-down";

interface AfterCheckProp {
  state: string;
  onChange: (newState: string) => void;
  type?: "NO";
}

const AfterCheck: React.FC<AfterCheckProp> = ({ state, onChange, type }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(state);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOption(state);
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

  const style = () => {
    switch (selectedOption) {
      case "출석":
        return "text-neutral-100";
      case "무단":
        return "border border-error-500 text-error-500";
      case "외출":
        return "border border-primary-500 text-primary-500";
      case "이동":
        return "border border border-tertiary-300 text-tertiary-300";
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
        return "#414BA2";
      case "출석":
        return "#475467";
      case "귀가":
        "#475467";
      default:
        return undefined;
    }
  };

  const ChangeEn = (option: string) => {
    switch (option) {
      case "무단":
        return "DISALLOWED";
      case "외출":
        return "GO_OUT";
      case "이동":
        return "MOVEMENT";
      case "출석":
        return "ATTENDANCE";
      case "귀가":
        return "GO_HOME";
      default:
        return "";
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onChange(ChangeEn(option));
    setIsDropdownVisible(false);
  };

  return state === "현체" ? (
    <div
      className={`w-full h-max p-4 text-label1 text-neutral-400 rounded-lg bg-white`}
    >
      {selectedOption}
    </div>
  ) : (
    <div
      className={`relative box-border h-14 group p-4 bg-white rounded-lg text-label1 flex justify-between items-center ${style()} w-29%`}
      ref={dropdownRef}
      onClick={toggleDropdown}
    >
      <div>{selectedOption}</div>

      {type === "NO" ? null : (
        <div className="w-4 h-4">
          <CaretDown color={ArrowColor()} />
        </div>
      )}

      {isDropdownVisible && type !== "NO" && (
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
            className={`${commonStyle} text-neutral-50`}
            onClick={() => handleOptionClick("귀가")}
          >
            귀가
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

export default AfterCheck;
