"use client";
import { ChangeState } from "@/apis/weekendMeal";
import React, { useState, useRef, useEffect } from "react";

interface StateDropProps {
  option: "신청" | "미신청" | "미응답";
  id: string;
  onclick: () => void;
}

const ClassmealDrop = ({ option, id, onclick }: StateDropProps) => {
  const { mutate: ChangeMealMutate } = ChangeState();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const Change = async (selectedOption: "신청" | "미신청") => {
    const status = selectedOption === "미신청" ? "NO" : "OK";
    try {
      await ChangeMealMutate(
        { status, userId: id || "" },
        {
          onSuccess: () => {},
          onError: (error) => {
            alert(`${error.message} : 에러가 발생하였습니다`);
          },
        }
      );
    } catch (error) {
      alert(`상태변경중 에러가 발생했습니다`);
      console.log(error);
    }
  };

  const change = () => {
    return option;
  };

  const toggleDropdown = () => {
    if (option === "미응답") {
      setIsDropdownVisible(!isDropdownVisible);
    }
  };

  const handleOptionClick = (selectedOption: "신청" | "미신청") => {
    setIsDropdownVisible(false);
    Change(selectedOption);
    onclick();
  };

  const dropStyle = () => {
    switch (option) {
      case "미응답":
        return "group border bg-white py-1 px-3 focus:border-primary-200 rounded-lg cursor-pointer flex items-center justify-center";
      case "미신청":
        return "bg-white py-1 border px-3 rounded-lg flex justify-center items-center border-primary-500 text-neutral-500";
      case "신청":
        return "bg-primary-300 py-1 px-3 rounded-lg flex justify-center items-center text-white";
    }
  };

  const commonStyle = "py-4 px-2 rounded hover:bg-primary-200 hover:text-white";

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

  return (
    <div className="relative w-24" ref={dropdownRef}>
      <div className={dropStyle()} onClick={toggleDropdown}>
        {change()}
      </div>
      {option === "미응답" && isDropdownVisible && (
        <div className="absolute z-10 bg-white border rounded-lg w-full text-Button-S">
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
