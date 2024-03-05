"use client";
import React from "react";
import Header from "../components/common/header/page";
import Link from "next/link";
import { useState } from "react";
import Dropdown from "../components/common/dropdown/page";
import Button from "../components/common/button/page";
import { Allmeals } from "../components/common/list/Allmeals/page";

const WeekendMeals = () => {
  const Data = {
    number: ["1212", "1241", "4832", "1245"],
    name: ["박현아", "아무나", "집가저", "히히히"],
    state: [true, false, false, true],
  };

  return (
    <div className="h-dvh">
      <Header />
      <div className="flex flex-col gap-7 px-100 py-16 h-90%">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; 주말 급식 신청 현황
        </div>
        <div className="flex justify-between">
          <div className="flex font-sans text-heading4 text-gray-900 gap-4 items-center">
            주말 급식 신청 현황
          </div>
          <div className="flex items-center gap-5">
            <Button
              colorType="ghost"
              children="엑셀로 출력하기"
              onClick={() => {}}
              buttonSize="small"
            />
            <Dropdown type="grade" />
            <Dropdown type="class" />
          </div>
        </div>
        <div className="w-auto h-full overflow-y-scroll items-center flex flex-col gap-4 scrollbar-hide">
          <div className=" flex w-full pr-44 justify-between pl-30">
            <div className=" flex gap-36">
              <div>학번</div>
              <div>이름</div>
            </div>
            <div>신청 상태</div>
          </div>
          {Data.name.map((name, index) => (
            <Allmeals
              key={index}
              number={Data.number[index]}
              state={Data.state[index]}
              name={name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekendMeals;
