"use client";
import Header from "@/app/components/common/header/page";
import { ReasonList } from "@/app/components/common/list/reason/page";
import DoubleTab from "@/app/components/common/tab/page";
import { getFullToday, getToday } from "@/utils/date";
import Link from "next/link";
import { useState } from "react";

const Reason = () => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const onClickTab = (tab: boolean) => {
    setSelectedTab(tab);
  };
  const Data = {
    student: ["1410 강해민", "1410 강해민", "1410 강해민", "1410 강해민"],
    time: ["11:20", "12:00", "13:30", "14:45"],
    why: ["집에각고싶어", "학교가 싫어서", "무기력해져서 집에 가력오"],
  };
  return (
    <div className="h-dvh">
      <Header teacher="박현아" />
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
              {Data.student.map((name, index) => (
                <ReasonList
                  key={index}
                  time={Data.time[index]}
                  student={Data.student[index]}
                  why={Data.why[index]}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-5 justify-between">
              {Data.student.map((name, index) => (
                <ReasonList
                  key={index}
                  time={Data.time[index]}
                  student={name}
                  why={Data.why[index]}
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
