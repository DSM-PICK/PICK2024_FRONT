"use client";
import React, { useEffect } from "react";
import Header from "../components/common/Header";
import Link from "next/link";
import DoubleTab from "../components/common/tab/page";
import { getFullToday } from "@/utils/date";
import { useState } from "react";
import Dropdown from "../components/common/dropdown";
import ChangeClass from "../components/common/list/changeClass/page";
import { ChangeClassList, GetFloor } from "@/apis/outList/list";
import { getStudentString } from "@/utils/until";

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
    console.log(`grade: ${selectedGrade} class: ${selectedClass}`);
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
    <div className="h-dvh min-w-fit">
      <Header />
      <div className="flex flex-col gap-7 3xl:px-100 px-80 min-w-max py-16 h-90%">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; 교실 이동
        </div>
        <div className="flex justify-between">
          <div className="flex font-sans 3xl:text-heading4 text-heading6-M text-gray-900 gap-4 items-center">
            교실 이동
            <div className="text-neutral-200 3xl:text-heading5 text-heading-6">
              {getFullToday()}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <DoubleTab
              firstChildren="반 별로 보기"
              secondChildren="층 별로 보기"
              onClick={onClickTab}
            />
            {selectedTab ? (
              <>
                <Dropdown type="grade" onChange={handleGradeChange} />
                <Dropdown type="class" onChange={handleClassChange} />
              </>
            ) : (
              <Dropdown type="floor" onChange={handleFloorChange} />
            )}
          </div>
        </div>
        <div className="w-auto rounded-xl bg-primary-1200 h-full px-10 py-10 overflow-y-scroll scrollbar-hide">
          {selectedTab ? (
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
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default OutList;
