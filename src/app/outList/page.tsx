"use client";
import React from "react";
import { useRouter } from "next/navigation";
import DoubleTab from "../components/common/tab/page";
import { getFullToday } from "@/utils/date";
import ReturnHome from "../components/common/list/returnHome/page";
import Out from "../components/common/list/out/page";
import { useState, useEffect } from "react";
import { FloorOutList, ReturnHomeList } from "@/apis/outList/list";
import { getStudentString } from "@/utils/until";
import { BackGround } from "../components/common/background";
import Dropdown from "../components/common/dropdown";

interface earlyreturnOK {
  id: string;
  username: string;
  start_time: string;
  grade: number;
  class_num: number;
  num: number;
}

interface applicationOK {
  id: string;
  username: string;
  start_time: string;
  end_time: string;
  grade: number;
  class_num: number;
  num: number;
  reason: string;
}

const OutList = () => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const [applicationList, setApplicationList] = useState<applicationOK[]>([]);
  const [earlyreturnlist, setEarlyreturnList] = useState<earlyreturnOK[]>([]);
  const [selectedFloor, setSelectedFloor] = useState<number>(5);

  const router = useRouter();

  const { mutate: floorList } = FloorOutList();
  const { data: home } = ReturnHomeList();

  const onClickTab = (tab: boolean) => {
    setSelectedTab(tab);
  };

  const handleFloorChange = (selectedOption: number) => {
    setSelectedFloor(selectedOption);
  };

  const Get = async () => {
    floorList(
      { floor: selectedFloor, status: "OK" },
      {
        onSuccess: (data) => {
          setApplicationList(data);
        },
      }
    );
  };

  useEffect(() => {
    Get();
  }, [selectedFloor]);

  useEffect(() => {
    if (home) {
      setEarlyreturnList(home);
    }
  }, [home]);

  return (
    <BackGround
      linkChildren="외출자 목록"
      subTitle="외출자 목록"
      secondTitle={getFullToday()}
      DropChildren={
        <>
          <DoubleTab
            firstChildren="외출"
            secondChildren="조기귀가"
            onClick={onClickTab}
          />
          <Dropdown type="floor" onChange={handleFloorChange} />
        </>
      }
    >
      {selectedTab ? (
        <div className="flex flex-wrap gap-5 justify-between">
          {applicationList?.map((data, index) => (
            <Out
              id={data.id}
              key={index}
              returnTime={data.end_time}
              student={getStudentString(data)}
              reason={data.reason}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-5 justify-between">
          {earlyreturnlist?.map((data, index) => (
            <ReturnHome key={index} student={getStudentString(data)} />
          ))}
        </div>
      )}
    </BackGround>
  );
};

export default OutList;
