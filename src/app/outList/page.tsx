"use client";
import React from "react";
import Header from "../components/common/header/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DoubleTab from "../components/common/tab/page";
import Button from "../components/common/button/page";
import { getFullToday, getToday } from "@/utils/date";
import { ReturnHome } from "../components/common/list/returnHome/page";
import { Out } from "../components/common/list/out/page";
import { useState } from "react";

const OutList = () => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const router = useRouter();

  const returnhomeData = {
    names: ["김도경", "1410 강해민", "1410 강해민", "1410 강해민"],
    times: ["11:20", "12:00", "13:30", "14:45"],
  };

  const onClickTab = (tab: boolean) => {
    setSelectedTab(tab);
  };

  const reason = () => {
    router.push(`/outList/reason`);
  };

  return (
    <div className="h-dvh">
      <Header teacher="박현아" />
      <div className="flex flex-col gap-7 px-100 py-16 h-90%">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; 외출자 목록
        </div>
        <div className="flex justify-between">
          <div className="flex font-sans text-heading4 text-gray-900 gap-4 items-center">
            외출자 목록
            <div className="text-neutral-200 text-heading5">
              {getFullToday()}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <DoubleTab
              firstChildren="외출"
              secondChildren="조기귀가"
              onClick={onClickTab}
            />
            <Button
              children="사유보기"
              colorType="ghost"
              buttonSize="small"
              onClick={reason}
            />
          </div>
        </div>
        <div className="w-auto rounded-xl bg-primary-1200 h-full px-10 py-10">
          {selectedTab ? (
            <div className="flex flex-wrap gap-5 justify-between">
              {returnhomeData.names.map((name, index) => (
                <ReturnHome key={index} student={name} />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-5 justify-between">
              {returnhomeData.names.map((name, index) => (
                <Out
                  key={index}
                  returnTime={returnhomeData.times[index]}
                  student={name}
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
