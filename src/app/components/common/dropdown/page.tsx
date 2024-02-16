import Image from "next/image";
import React, { useState } from "react";
import nonearrow from "@/assets/img/Icon/chevron-right.svg";
import clickarrow from "@/assets/img/Icon/downarrow.svg";

interface DropProps {
  type: "floor" | "grade" | "class";
}

export const Dropdown: React.FC<DropProps> = ({ type }) => {
  const defaultOptions: Record<string, string> = {
    floor: "2층",
    grade: "1학년",
    class: "1반",
  };

  const [selectedOption, setSelectedOption] = useState<string>(
    defaultOptions[type]
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);
  };
  const commonStyle = "py-5 px-3 rouded hover:bg-primary-200 hover:text-white";

  return (
    <div className="relative w-38">
      <div
        className="group border py-4 px-6 focus:border-primary-200 rounded-lg cursor-pointer flex items-center justify-between"
        onClick={toggleDropdown}
      >
        {selectedOption}
        <Image
          src={isDropdownVisible ? clickarrow : nonearrow}
          alt="arrow"
          width={16}
          height={16}
        />
      </div>
      {isDropdownVisible && (
        <div className="absolute bg-white border rounded-lg w-full text-Button-S z-20">
          {type === "floor" && (
            <>
              <div
                onClick={() => handleOptionClick("2층")}
                className={commonStyle}
              >
                2층
              </div>
              <div
                onClick={() => handleOptionClick("3층")}
                className={commonStyle}
              >
                3층
              </div>
              <div
                onClick={() => handleOptionClick("4층")}
                className={commonStyle}
              >
                4층
              </div>
            </>
          )}
          {type === "grade" && (
            <>
              <div
                onClick={() => handleOptionClick("1학년")}
                className={commonStyle}
              >
                1학년
              </div>
              <div
                onClick={() => handleOptionClick("2학년")}
                className={commonStyle}
              >
                2학년
              </div>
              <div
                onClick={() => handleOptionClick("3학년")}
                className={commonStyle}
              >
                3학년
              </div>
            </>
          )}
          {type === "class" && (
            <>
              <div
                onClick={() => handleOptionClick("1반")}
                className={commonStyle}
              >
                1반
              </div>
              <div
                onClick={() => handleOptionClick("2반")}
                className={commonStyle}
              >
                2반
              </div>
              <div
                onClick={() => handleOptionClick("3반")}
                className={commonStyle}
              >
                3반
              </div>
              <div
                onClick={() => handleOptionClick("4반")}
                className={commonStyle}
              >
                4반
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
