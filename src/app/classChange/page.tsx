"use client";
import React from "react";
import Header from "../components/common/header/page";
import Link from "next/link";
import DoubleTab from "../components/common/tab/page";
import { getFullToday } from "@/utils/date";
import { useState } from "react";
import Dropdown from "../components/common/dropdown/page";
import { ChangeClass } from "../components/common/list/changeClass/page";

const OutList = () => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);

  const returnhomeData = {
    names: ["1410 강해민", "1410 강해민", "1410 강해민", "1410 강해민"],
    prevClass: ["1-4", "2-3", "23-3", "5-6"],
    nextClass: ["1-2", "집", "1-7", "5-22"],
  };

  const onClickTab = (tab: boolean) => {
    setSelectedTab(tab);
  };

  return (
    <div className="h-dvh">
      <Header />
      <div className="flex flex-col gap-7 px-100 py-16 h-90%">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; 교실 이동
        </div>
        <div className="flex justify-between">
          <div className="flex font-sans text-heading4 text-gray-900 gap-4 items-center">
            교실 이동
            <div className="text-neutral-200 text-heading5">
              {getFullToday()}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <DoubleTab
              firstChildren="층 별로 보기"
              secondChildren="반 별로 보기"
              onClick={onClickTab}
            />
            {selectedTab ? (
              <>
                <Dropdown type="grade" />
                <Dropdown type="class" />
              </>
            ) : (
              <Dropdown type="floor" />
            )}
          </div>
        </div>
        <div className="w-auto rounded-xl bg-primary-1200 h-full px-10 py-10 overflow-y-scroll">
          {selectedTab ? (
            <div className="flex flex-wrap gap-5 justify-between">
              {returnhomeData.names.map((name, index) => (
                <ChangeClass
                  key={index}
                  prevClass={returnhomeData.prevClass[index]}
                  nextClass={returnhomeData.nextClass[index]}
                  student={name}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-5 justify-between">
              {returnhomeData.names.map((name, index) => (
                <ChangeClass
                  key={index}
                  prevClass={returnhomeData.prevClass[index]}
                  nextClass={returnhomeData.nextClass[index]}
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
