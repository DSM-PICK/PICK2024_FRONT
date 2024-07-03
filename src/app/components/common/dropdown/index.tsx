import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import arrow from "@/assets/img/Icon/chevron-right.svg";
import downarrow from "@/assets/img/Icon/downarrow.svg";

interface DropProps {
  type: "floor" | "grade" | "class" | "club" | "all";
  onChange?: (selectedOption: any, type: string) => void;
}

const Dropdown: React.FC<DropProps> = ({ type, onChange }) => {
  const [selectedGradeOption, setSelectedGradeOption] = useState<number>(1);
  const [selectedClassOption, setSelectedClassOption] = useState<number>(1);
  const [selectedFloorOption, setSelectedFloorOption] = useState<number>(5);
  const [selectedClubOption, setSelectedClubOption] =
    useState<string>("세미나실 2-1(대동여지도)");
  const [selectedAllOption, setSelectedAllOption] = useState<number>(5);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const grade = parseInt(localStorage.getItem("grade") || "1", 10);
    const class_num = parseInt(localStorage.getItem("class_num") || "1", 10);
    const setgrade = grade === 0 ? 1 : grade;
    const setclass_num = class_num === 0 ? 1 : class_num;
    if (type === "all") {
      setSelectedAllOption(setgrade);
    }
    setSelectedGradeOption(setgrade);
    setSelectedClassOption(setclass_num);

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
  }, [type]);

  const handleOptionClick = (option: any) => {
    if (onChange) {
      onChange(option.value, type);
      if (type === "grade") {
        setSelectedGradeOption(option.value);
      } else if (type === "class") {
        setSelectedClassOption(option.value);
      } else if (type === "floor") {
        setSelectedFloorOption(option.value);
      } else if (type === "club") {
        setSelectedClubOption(option.label);
      } else if (type === "all") {
        setSelectedAllOption(option.value);
      }
    }
    setIsDropdownVisible(false);
  };

  const generateOptions = (options: any[]) => {
    return options.map((option) => (
      <div
        key={option.value}
        onClick={() => handleOptionClick(option)}
        className="py-5 px-3 rounded hover:bg-primary-200 hover:text-white"
      >
        {option.label}
      </div>
    ));
  };

  const floorOptions = [
    { value: 2, label: "2층" },
    { value: 3, label: "3층" },
    { value: 4, label: "4층" },
    { value: 5, label: "전체" },
  ];

  const AllOption = [
    { value: 1, label: "1학년" },
    { value: 2, label: "2학년" },
    { value: 3, label: "3학년" },
    { value: 5, label: "전체" },
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
    { value: "자습3", label: "3-1교실(자습)" },
    { value: "대동여지도", label: "세미나실 2-1(대동여지도)" },
    { value: "DMS", label: "세미나실 2-2(DMS)" },
    { value: "gram", label: "세미나실 2-3(gram)" },
    { value: "Liear", label: "세미나실 2-4(Liear)" },
    { value: "gram-2", label: "3-2교실(gram)" },
    { value: "EXIT", label: "소개1실(EXIT)" },
    { value: "Lift", label: "소개2실(Lift)" },
    { value: "DMS-2", label: "소개3실(DMS 3학년)" },
    { value: "자습2", label: "2-1교실(자습)" },
    { value: "Log", label: "세미나실 3-1(Log)" },
    { value: "은하", label: "세미나실 3-2(은하)" },
    { value: "PiCK", label: "세미나실 3-3(PiCK)" },
    { value: "DLC", label: "보안 1실(어게인)" },
    { value: "info", label: "보안 2실(info)" },
    { value: "TeamQSS", label: "세미나실 4-1(TeamQSS)" },
    { value: "NoNamed", label: "세미나실 4-2(NoNamed)" },
    { value: "Modeep", label: "세미나실 4-3(Modeep)" },
    { value: "자습1", label: "1-1교실(자습)" },
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
      : type === "all"
      ? AllOption
      : [];

  return (
    <div className="relative w-auto" ref={dropdownRef}>
      <div
        className="group border py-4 px-6 focus:border-primary-200 rounded-lg cursor-pointer flex items-center justify-between"
        onClick={toggleDropdown}
      >
        {type === "grade"
          ? `${selectedGradeOption}학년`
          : type === "class"
          ? `${selectedClassOption}반`
          : type === "floor"
          ? selectedFloorOption === 5
            ? `전체`
            : `${selectedFloorOption}층`
          : type === "all"
          ? selectedAllOption === 5
            ? `전체`
            : `${selectedAllOption}학년`
          : selectedClubOption}
        <Image
          src={isDropdownVisible ? downarrow.src : arrow.src}
          alt="arrow"
          width={16}
          height={16}
        />
      </div>
      {isDropdownVisible && (
        <div className="absolute h-auto max-h-72 overflow-y-scroll bg-white border rounded-lg w-max text-Button-S z-20">
          {generateOptions(options)}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
