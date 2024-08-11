"use client";
import React, { useEffect } from "react";
import DoubleTab from "../../components/common/tab/page";
import { getFullToday } from "@/utils/date";
import { useState } from "react";
import Dropdown from "../../components/common/dropdown";
import ChangeClass from "../../components/common/list/changeClass/page";
import { ChangeClassList, GetFloor } from "@/apis/changeClass";
import { getStudentString } from "@/utils/until";
import { BackGround } from "../../components/common/background";
import Link from "next/link";

interface changeClass {
  id: string;
  class_num: number;
  classroom_name: string;
  end_period: number;
  grade: number;
  move: string;
  num: number;
  start_period: number;
  username: string;
}

const ClassChangeOk = () => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const [floorData, setFloorData] = useState<changeClass[]>([]);
  const [changelist, setChangelist] = useState<changeClass[]>([]);
  const [selectedFloor, setSelectedFloor] = useState<number>(5);

  const { mutate: changelistMutate } = ChangeClassList();
  const { mutate: changelistFloorMutate } = GetFloor();

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

  const ChangeClassDataFloor = async () => {
    try {
      await changelistFloorMutate(
        { floor: selectedFloor },
        {
          onSuccess: (data) => {
            setFloorData(data);
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const changeClassData = async () => {
    try {
      if (selectedClass && selectedGrade) {
        await changelistMutate(
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
      linkChildren={
        <>
          <Link href={"/classChange"}>교실 이동 수락</Link> &gt; 교실 이동 현황
        </>
      }
      DropChildren={
        <>
          <DoubleTab
            firstChildren="반 별로 보기"
            secondChildren="층 별로 보기"
            onClick={onClickTab}
          />
          <div className="flex gap-5">
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
      <div className="flex flex-wrap gap-5 justify-between w-full">
        {selectedTab
          ? changelist?.map((item, index) => (
              <ChangeClass
                key={index}
                prevClass={item.move}
                nextClass={item.classroom_name}
                student={getStudentString(item)}
              />
            ))
          : floorData?.map((item, index) => (
              <ChangeClass
                key={index}
                prevClass={item.move}
                nextClass={item.classroom_name}
                student={getStudentString(item)}
              />
            ))}
      </div>
    </BackGround>
  );
};

export default ClassChangeOk;
