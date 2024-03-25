import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import arrow from "@/assets/img/Icon/chevron-right.svg";
import downarrow from "@/assets/img/Icon/downarrow.svg";

interface ItemType {
  value: string | number;
  label: string;
}

interface DropProps {
  dropDownItem?: ItemType[];
  type: "floor" | "grade" | "class" | "club";
  reqOption?: "application" | "early-return";
  onChange?: (selectedOption: number, type: string) => void;
  isOpen?: boolean;
}

const Dropdown: React.FC<DropProps> = ({
  type,
  reqOption = "application",
  onChange,
  isOpen,
}) => {
  const [selectedGradeOption, setSelectedGradeOption] = useState<number>(1);
  const [selectedClassOption, setSelectedClassOption] = useState<number>(1);
  const [selectedFloorOption, setSelectedFloorOption] = useState<number>(2);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

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

  const handleOptionClick = (option: any) => {
    if (onChange) {
      onChange(option.value, type);
      if (type === "grade") {
        setSelectedGradeOption(option.value);
      } else if (type === "class") {
        setSelectedClassOption(option.value);
      } else if (type === "floor") {
        setSelectedFloorOption(option.value);
      }
    }
    setIsDropdownVisible(false);
  };

  const commonStyle = "py-5 px-3 rounded hover:bg-primary-200 hover:text-white";

  const generateOptions = (options: any[]) => {
    return options.map((option) => (
      <div
        key={option.value}
        onClick={() => handleOptionClick(option)}
        className={`${commonStyle}`}
      >
        {option.label}
      </div>
    ));
  };

  const floorOptions = [
    { value: 2, label: "2층" },
    { value: 3, label: "3층" },
    { value: 4, label: "4층" },
  ];

  const gradeOptions = [
    { value: 1, label: "1학년" },
    { value: 2, label: "2학년" },
    { value: 3, label: "3학년" },
  ];

  const classOptions = [
    { value: 1, label: "1반" },
    { value: 2, label: "2반" },
    { value: 3, label: "3반" },
    { value: 4, label: "4반" },
  ];

  const clubOptions = [
    { value: "픽", label: "픽" },
    { value: "정", label: "정" },
    { value: "등등", label: "등등" },
  ];

  const options =
    type === "floor"
      ? floorOptions
      : type === "grade"
      ? gradeOptions
      : type === "class"
      ? classOptions
      : type === "club"
      ? clubOptions
      : [];

  return (
    <div className="relative w-38" ref={dropdownRef}>
      <div
        className="group border py-4 px-6 focus:border-primary-200 rounded-lg cursor-pointer flex items-center justify-between"
        onClick={toggleDropdown}
      >
        {type === "grade"
          ? `${selectedGradeOption}학년`
          : type === "class"
          ? `${selectedClassOption}반`
          : `${selectedFloorOption}층`}
        <Image
          src={isDropdownVisible ? `${downarrow.src}` : `${arrow.src}`}
          alt="arrow"
          width={16}
          height={16}
        />
      </div>
      {isDropdownVisible && (
        <div className="absolute bg-white border rounded-lg w-full text-Button-S z-20">
          {generateOptions(options)}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
