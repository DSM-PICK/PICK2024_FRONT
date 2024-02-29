// Dropdown.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import nonearrow from "@/assets/img/Icon/chevron-right.svg";
import clickarrow from "@/assets/img/Icon/downarrow.svg";
import { getClass, getFloor } from "@/apis/outAccept/outAccept";

interface DropProps {
  type: "floor" | "grade" | "class" | "club";
  reqOption?: "application" | "early-return";
  onChange?: (selectedOption: string, type: string) => void;
}

export const Dropdown: React.FC<DropProps> = ({
  type,
  reqOption,
  onChange,
}) => {
  const defaultOptions: Record<string, string> = {
    floor: "2층",
    grade: "1학년",
    class: "1반",
    club: "픽",
  };

  const { mutate: getFloorMutate } = getFloor();
  const { mutate: getClassMutate } = getClass();

  const [selectedGradeOption, setSelectedGradeOption] = useState<string>(
    defaultOptions.grade
  );
  const [selectedClassOption, setSelectedClassOption] = useState<string>(
    defaultOptions.class
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  useEffect(() => {
    handleGradeOption();
  }, [selectedGradeOption]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionClick = (option: string) => {
    if (type === "grade") {
      setSelectedGradeOption(option);
      handleGradeOption();
    } else if (type === "class") {
      setSelectedClassOption(option);
      handleClassOption();
    } else {
      handleOtherOption(option);
    }

    setIsDropdownVisible(false);
  };

  const handleGradeOption = () => {
    const gradeValue = parseInt(selectedGradeOption, 10);
    const classNumber = parseInt(selectedClassOption, 10);
    Class({
      type: reqOption,
      grade: gradeValue,
      class: classNumber,
    });
  };

  const handleClassOption = () => {
    Class({
      type: reqOption,
      grade: parseInt(selectedGradeOption, 10),
      class: parseInt(selectedClassOption, 10),
    });
  };

  const handleOtherOption = (option: string) => {
    const floorValue = parseInt(option, 10);
    Floor({ type: reqOption, floor: floorValue });
  };

  const Class = async (classInfo: {
    type: string;
    grade: number;
    class: number;
  }) => {
    try {
      await getClassMutate(classInfo, {
        onSuccess: (data) => {
          console.log(
            `${classInfo.grade}학년과 ${classInfo.class}반 데이터 불러오기 성공`
          );
        },
        onError: (error) => {
          console.log(error);
        },
      });
    } catch (error) {
      console.error(error);
    }
    setIsDropdownVisible(false);
  };

  const Floor = async (floor: { type: string; floor: number }) => {
    try {
      await getFloorMutate(floor, {
        onSuccess: (data) => {
          console.log("데이터 불러오기 성공");
        },
        onError: (error) => {
          console.log(error);
        },
      });
    } catch (error) {
      console.error(error);
    }
    setIsDropdownVisible(false);
  };

  const commonStyle = "py-5 px-3 rounded hover:bg-primary-200 hover:text-white";

  return (
    <div className="relative w-38">
      <div
        className="group border py-4 px-6 focus:border-primary-200 rounded-lg cursor-pointer flex items-center justify-between"
        onClick={toggleDropdown}
      >
        {type === "grade" ? selectedGradeOption : selectedClassOption}
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
          {type === "club" && (
            <>
              <div
                onClick={() => handleOptionClick("픽")}
                className={commonStyle}
              >
                픽
              </div>
              <div
                onClick={() => handleOptionClick("정")}
                className={commonStyle}
              >
                정
              </div>
              <div
                onClick={() => handleOptionClick("등등")}
                className={commonStyle}
              >
                등등
              </div>
              {/*api연결하면 map함수로 바꿀 예정 */}
            </>
          )}
        </div>
      )}
    </div>
  );
};
