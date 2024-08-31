"use client";
import React, { useState, useRef, useEffect } from "react";

interface StateDropProps {
  option: "신청" | "미신청";
  id: string;
  onclick: (selectedOption: "신청" | "미신청") => void;
}

const ClassmealDrop = ({ option, id, onclick }: StateDropProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionClick = (selectedOption: "신청" | "미신청") => {
    setIsDropdownVisible(false);
    onclick(selectedOption); // 수정된 부분
  };

  const dropStyle = () => {
    switch (option) {
      case "미신청":
        return "bg-white py-1 border px-3 rounded-lg flex justify-center items-center border-primary-500 text-neutral-500";
      case "신청":
        return "bg-primary-300 py-1 px-3 rounded-lg flex justify-center items-center text-white";
    }
  };

  const commonStyle =
    "py-4 px-2 rounded hover:bg-primary-200 hover:text-white cursor-pointer";

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

  const grade = parseInt(localStorage.getItem("grade") || "1", 10);

  return (
    <div className="relative w-24 " ref={dropdownRef}>
      <div className={dropStyle()} onClick={toggleDropdown}>
        {option}
      </div>
      {grade !== 0 && isDropdownVisible && (
        <div className="absolute z-10 bg-white border rounded-lg w-full text-Button-S ">
          <div
            onClick={() => {
              handleOptionClick("신청");
            }}
            className={commonStyle}
          >
            신청
          </div>
          <div
            onClick={() => {
              handleOptionClick("미신청");
            }}
            className={commonStyle}
          >
            미신청
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassmealDrop;
