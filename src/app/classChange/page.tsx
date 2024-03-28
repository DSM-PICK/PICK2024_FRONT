"use client";
import React, { useEffect } from "react";
import DoubleTab from "../components/common/tab/page";
import { getFullToday } from "@/utils/date";
import { useState } from "react";
import Dropdown from "../components/common/dropdown";
import ChangeClass from "../components/common/list/changeClass/page";
import { ChangeClassList, GetFloor } from "@/apis/changeClass";
import { getStudentString } from "@/utils/until";
import { BackGround } from "../components/common/background";

interface changeClass {
  class_num: number;
  classroom_name: string;
  floor: number;
  grade: number;
  id: string;
  num: number;
  user_id: string;
  username: string;
}

const OutList = () => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const { mutate: changelistMutate } = ChangeClassList();
  const { mutate: changelistFloorMutate } = GetFloor();
  const [changelist, setChangelist] = useState<changeClass[]>([]);
  const [selectedFloor, setSelectedFloor] = useState<number>(2);

  const onClickTab = (tab: boolean) => {
    setSelectedTab(tab);
  };

  const handleGradeChange = (selectedOption: number) => {
    setSelectedGrade(selectedOption);
  };

  const handleClassChange = (selectedOption: number) => {
    setSelectedClass(selectedOption);
  };

  const handleFloorChange = (selectedOption: number) => {
    setSelectedFloor(selectedOption);
  };

  useEffect(() => {
    changeClassData();
  }, [selectedGrade, selectedClass]);

  useEffect(() => {
    ChangeClassDataFloor();
  }, [selectedFloor]);

  useEffect(() => {
    changeClassData();
  }, []);

  const ChangeClassDataFloor = async () => {
    try {
      if (selectedFloor) {
        const response = await changelistFloorMutate(
          { floor: selectedFloor },
          {
            onSuccess: (data) => {
              setChangelist(data);
            },
            onError: (error) => {
              console.log(error);
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeClassData = async () => {
    try {
      if (selectedClass && selectedGrade) {
        const response = await changelistMutate(
          { grade: selectedGrade, class: selectedClass },
          {
            onSuccess: (data) => {
              setChangelist(data);
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BackGround
      subTitle="교실 이동"
      secondTitle={getFullToday()}
      linkChildren="교실 이동"
      DropChildren={
        <>
          <DoubleTab
            firstChildren="반 별로 보기"
            secondChildren="층 별로 보기"
            onClick={onClickTab}
          />
          <div className=" flex gap-5">
            {selectedTab ? (
              <>
                <Dropdown type="grade" onChange={handleGradeChange} />
                <Dropdown type="class" onChange={handleClassChange} />
              </>
            ) : (
              <Dropdown type="floor" onChange={handleFloorChange} />
            )}
          </div>
        </>
      }
    >
      <div className="flex flex-wrap gap-5 justify-between">
        {changelist?.map((item, index) => (
          <ChangeClass
            key={index}
            prevClass={`${item.grade}-${item.class_num}`}
            nextClass={item.classroom_name}
            student={getStudentString(item)}
          />
        ))}
      </div>
    </BackGround>
  );
};

export default OutList;
