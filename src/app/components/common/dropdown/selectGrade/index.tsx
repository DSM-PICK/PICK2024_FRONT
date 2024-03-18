import React, { useState, useRef, useEffect } from "react";

interface GradeOption {
  value: number;
  label: string;
}

interface SelectGradeProps {
  onSelect: (grade: number) => void; // Change the type here
}

const SelectGrade: React.FC<SelectGradeProps> = ({ onSelect }) => {
  const gradeOptions: GradeOption[] = [
    { value: 1, label: "1학년" },
    { value: 2, label: "2학년" },
    { value: 3, label: "3학년" },
    { value: 4, label: "전교생" },
  ];

  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleGradeSelection = (grade: number) => {
    setSelectedGrade(grade);
    onSelect(grade);
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-78" ref={dropdownRef}>
      <div
        className="group bg-neutral-900 text-neutral-500 text-caption1 cursor-pointer p-3"
        onClick={toggleDropdown}
      >
        {gradeOptions.find((option) => option.value === selectedGrade)?.label ??
          "학년을 선택하세요"}
      </div>
      {dropdownOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg">
          {gradeOptions.map((option) => (
            <div
              key={option.value}
              className={`block w-full py-2 px-4 text-left hover:bg-gray-200 cursor-pointer ${
                selectedGrade === option.value ? "bg-gray-200" : ""
              }`}
              onClick={() => handleGradeSelection(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectGrade;
