"use client";
import React, { useEffect, useRef, useState } from "react";
import SelectedBadges from "./badge/page";
import { AllStudent } from "@/apis/afterManage";
import { setStudentNum } from "@/utils/until";
import { GetAllTeacher } from "@/apis/changeTeacher";
import { Type } from "@/apis/type";

interface ChangeProps {
  text: string;
  name: string;
}

interface InputProps {
  placeholder?: string;
  width?: string;
  name?: string;
  onChange: ({ text, name }: ChangeProps) => void;
  value: string;
  type: "student" | "teacher";
}

interface AutoInputProps extends InputProps {
  selectedValues?: string[];
  onRemoveBadge?: (value: string) => void;
}

export const PostSelectedValues: React.FC<AutoInputProps> = ({
  selectedValues,
}) => {
  return selectedValues;
};

const AutoInput: React.FC<AutoInputProps> = ({
  placeholder,
  width,
  onChange,
  value,
  name = "",
  type,
}) => {
  const [isAutoCompleteVisible, setIsAutoCompleteVisible] =
    useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const { data: GetStudentMutate } = AllStudent();
  const { data: GetTeacer } = GetAllTeacher();
  const [teacherData, setTeacherData] = useState<string[]>();

  const containerClassName = ` w-${width} h-auto border border-neutral-900 rounded flex justify-between items-center px-2 bg-neutral-900 hover:border-neutral-500 hover:bg-white active:border-secondary-500 caret-primary-500 focus:border-secondary-500`;

  const [data, setData] = useState<Type[]>([]);

  useEffect(() => {
    if (GetTeacer) {
      setTeacherData(GetTeacer);
    }
  }, [GetTeacer]);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(selectedValues));
  }, [selectedValues]);

  useEffect(() => {
    if (type === "student" && GetStudentMutate) {
      setData(GetStudentMutate);
    }
  }, [GetStudentMutate]);

  useEffect(() => {
    if (type === "student") {
      const students = data?.map(
        (item) => `${setStudentNum(item)} ${item.name}`
      );
      setStudent(students);
    }
  }, [data]);

  const [student, setStudent] = useState<string[]>([]);

  const inputClassName =
    "h-10 px-2 border-none bg-transparent placeholder-neutral-500 focus:outline-none rounded  w-full";

  const handleInputChange = (inputText: string) => {
    if (type === "student") {
      const filtered = student?.filter((item) =>
        item.toLowerCase().includes(inputText.toLowerCase())
      );
      setFilteredData(filtered?.map((item) => item) || []);
      setIsAutoCompleteVisible(true);

      onChange({ text: inputText, name });
    } else if (type === "teacher") {
      const filtered = teacherData?.filter((item) =>
        item.toLowerCase().includes(inputText.toLowerCase())
      );
      setFilteredData(filtered?.map((item) => item) || []);
      setIsAutoCompleteVisible(true);

      onChange({ text: inputText, name });
    }
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsAutoCompleteVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectOption = (selectedOption: string) => {
    onChange({ text: selectedOption, name });
    setIsAutoCompleteVisible(false);

    setSelectedValues((prevValues) => [...prevValues, selectedOption]);
  };

  const handleRemoveBadge = (value: string) => {
    setSelectedValues((prevValues) => prevValues.filter((v) => v !== value));
  };

  const renderAutoComplete = () => (
    <div className="absolute top-full left-0 bg-white border rounded-lg w-full text-Button-S z-20 h-auto max-h-64 overflow-y-scroll">
      {filteredData.map((option) => (
        <div
          key={option}
          onClick={() => {
            handleSelectOption(option);
            if (type === "student") {
              handleInputChange("");
            }
            setIsAutoCompleteVisible(false);
          }}
          className="flex py-2 px-3 hover:bg-primary-200 hover:text-white cursor-pointer"
        >
          {option}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-3" ref={dropdownRef}>
      <div className="flex flex-col items-start relative">
        <div className={containerClassName}>
          <input
            className={inputClassName}
            type="text"
            placeholder={placeholder}
            width="full"
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>
        {isAutoCompleteVisible && renderAutoComplete()}
      </div>
      <div className="flex gap-3">
        {type === "teacher" ? (
          <></>
        ) : (
          <SelectedBadges
            selectedValues={selectedValues}
            onRemoveBadge={handleRemoveBadge}
          />
        )}
      </div>
    </div>
  );
};

export default AutoInput;
