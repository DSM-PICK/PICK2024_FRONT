"use client";
import Header from "@/app/components/common/header/page";
import { ReasonList } from "@/app/components/common/list/reason/page";
import DoubleTab from "@/app/components/common/tab/page";
import { getFullToday, getToday } from "@/utils/date";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AlloutList, ReturnHome } from "@/apis/outList/list";
import { getTimeString, getStudentString } from "@/utils/until";

interface OutListData {
  username: string;
  start_time: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  end_time: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  grade: number;
  class_num: number;
  num: number;
  reason: string;
}

interface HomeData {
  username: string;
  start_time: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
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
    console.log(data);
    try {
      const result = await outMutate(data, {
        onSuccess: () => {
          console.log("OutData: Success");
        },
        onError: (error) => {
          console.error("OutData: Error", error);
        },
      });
      if (result !== undefined && Array.isArray(result)) {
        setData(result);
      } else {
        console.error("Invalid result received:", result);
      }
    } catch (error) {
      console.error("OutData: Catch Error", error);
    }
  };
  const ReturnHomeData = async () => {
    try {
      const result = await returnHomeMutate(homeData, {
        onSuccess: () => {
          console.log("성공");
        },
        onError: (error) => {
          console.error(error);
        },
      });
      if (result !== undefined && Array.isArray(result)) {
        setHomeData(result);
      } else {
        console.error("Invalid result received:", result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickTab = (tab: boolean) => {
    setSelectedTab(tab);
    if (tab) {
      setSelectedTab(tab);
      ReturnHomeData();
    } else {
      Outdata();
    }
  };
  const homeTime = ({ start_time }: HomeData) => {
    return `${start_time.hour}:${start_time.minute}`;
  };

  const startTime = (item: { start_time: any }) =>
    getTimeString(item.start_time);

  const endTime = (item: { end_time: any }) => getTimeString(item.end_time);

  const student = (item: any) => getStudentString(item);

  useEffect(() => {
    ReturnHomeData();
  }, []);

  return (
    <div className="h-dvh">
      <Header />
      <div className="flex flex-col gap-7 px-100 py-16 h-90%">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt;
          <Link href="/outList">외출자 목록</Link> &gt;
          {selectedTab ? "조기 귀가 사유" : "외출자 사유"}
        </div>
        <div className="flex justify-between">
          <div className="flex font-sans text-heading4 text-gray-900 gap-4 items-center">
            {selectedTab ? "조기 귀가 사유" : "외출자 사유"}
            <div className="text-neutral-200 text-heading5">
              {getFullToday()}
            </div>
          </div>
          <div className="flex items-center">
            <DoubleTab
              firstChildren="외출"
              secondChildren="조기귀가"
              onClick={onClickTab}
            />
          </div>
        </div>
        <div className="w-auto rounded-xl bg-primary-1200 h-full px-10 py-10 overflow-y-scroll">
          {selectedTab ? (
            <div className="flex flex-wrap gap-5 justify-between">
              {homeData.map((item, index) => (
                <ReasonList
                  key={index}
                  time={homeTime(item)}
                  student={student(item)}
                  why={item.reason}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-5 justify-between">
              {data.map((item, index) => (
                <ReasonList
                  key={index}
                  time={startTime(item)}
                  endTime={endTime(item)}
                  student={student(item)}
                  why={item.reason}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reason;