"use client";
import { ChangeState } from "@/apis/weekendMeal";
import React, { useState, useRef, useEffect } from "react";

interface StateDropProps {
  state: "OK" | "NO" | "QUIET";
  id: string;
  onclick: () => void;
}

const ClassmealDrop = ({ state, id, onclick }: StateDropProps) => {
  const { mutate: ChangeMealMutate } = ChangeState();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const Change = async (option: string) => {
    const tem = option === "미신청" ? "NO" : "OK";
    try {
      await ChangeMealMutate(
        { status: tem, userId: id || "" },
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
    switch (state) {
      case "OK":
        return `신청`;
      case "NO":
        return `미신청`;
      case "QUIET":
        return `미응답`;
    }
  };

  const toggleDropdown = () => {
    if (state === "QUIET") {
      setIsDropdownVisible(!isDropdownVisible);
    }
  };

  const handleOptionClick = (option: string) => {
    setIsDropdownVisible(false);
    Change(option);
  };

  const dropStyle = () => {
    switch (state) {
      case "QUIET":
        return "group border bg-white py-1 px-3 focus:border-primary-200 rounded-lg cursor-pointer flex items-center justify-center";
      case "NO":
        return "bg-white py-1 border px-3 rounded-lg flex justify-center items-center border-primary-500 text-neutral-500";
      case "OK":
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
      {state === "QUIET" && isDropdownVisible && (
        <div className="absolute z-10 bg-white border rounded-lg w-full text-Button-S">
          <div
            onClick={() => {
              handleOptionClick("신청");
              onclick();
            }}
            className={commonStyle}
          >
            신청
          </div>
          <div
            onClick={() => {
              handleOptionClick("미신청");
              onclick();
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
