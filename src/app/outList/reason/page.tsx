"use client";
import Header from "@/app/components/common/Header";
import ReasonList from "@/app/components/common/list/reason/page";
import DoubleTab from "@/app/components/common/tab/page";
import { getFullToday } from "@/utils/date";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AlloutList, ReturnHome } from "@/apis/outList/list";
import { getStudentString } from "@/utils/until";
import { BackGround } from "@/app/components/common/background";

interface OutListData {
  id: string;
  user_id: string;
  username: string;
  start_time: string;
  end_time: string;
  grade: number;
  class_num: number;
  num: number;
  reason: string;
}

interface HomeData {
  id: string;
  user_id: string;
  username: string;
  start_time: string;
  grade: number;
  class_num: number;
  num: number;
  reason: string;
}

const Reason = () => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const [data, setData] = useState<OutListData[]>([]);

  const [homeData, setHomeData] = useState<HomeData[]>([]);

  const { mutate: outMutate } = AlloutList();
  const { mutate: returnHomeMutate } = ReturnHome();

  const Outdata = async () => {
    try {
      const result = await outMutate(null, {
        onSuccess: (data) => {
          setData(data);
        },
        onError: (error) => {
          console.error("OutData: Error", error);
        },
      });
    } catch (error) {
      console.error("OutData: Catch Error", error);
    }
  };

  const ReturnHomeData = async () => {
    try {
      const result = await returnHomeMutate(null, {
        onSuccess: (data) => {
          setHomeData(data);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onClickTab = (tab: boolean) => {
    setSelectedTab(tab);
    if (tab) {
      setSelectedTab(tab);
      Outdata();
    } else {
      ReturnHomeData();
    }
  };

  const student = (item: any) => getStudentString(item);

  useEffect(() => {
    Outdata();
  }, []);

  return (
    <BackGround
      linkChildren={`외출자 목록 > ${
        selectedTab ? "외출자 사유" : " 조기 귀가 사유"
      } `}
      subTitle={selectedTab ? "외출자 사유" : " 조기 귀가 사유"}
      secondTitle={getFullToday()}
      DropChildren={
        <DoubleTab
          firstChildren="외출"
          secondChildren="조기귀가"
          onClick={onClickTab}
        />
      }
    >
      {selectedTab ? (
        <div className="flex flex-wrap gap-5 justify-between">
          {data.map((item, index) => (
            <ReasonList
              key={index}
              time={item.start_time}
              endTime={item.end_time}
              student={student(item)}
              why={item.reason}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-5 justify-between">
          {homeData.map((item, index) => (
            <ReasonList
              key={index}
              time={item.start_time}
              student={student(item)}
              why={item.reason}
            />
          ))}
        </div>
      )}
    </BackGround>
  );
};

export default Reason;
