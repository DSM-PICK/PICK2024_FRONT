"use client";
import React from "react";
import { Allmeals } from "@/app/components/common/list/Allmeals/page";
import Link from "next/link";
import { useState } from "react";
import Dropdown from "@/app/components/common/dropdown/page";
import Button from "@/app/components/common/button/page";
import Header from "@/app/components/common/header/page";
import { Classmeals } from "@/app/components/common/list/classmeal/page";

interface classmealProps {
  grade: string;
  classNumber: string;
}

const WeekendMeals: React.FC<classmealProps> = ({ grade, classNumber }) => {
  const Data = {
    number: ["1212", "1241", "4832", "1245"],
    name: ["박현아", "아무나", "집가저", "히히히"],
    state: ["미응답", "신청", "미신청", "미응답"],
  };
  return (
    <div className="h-dvh">
      <Header />
      <div className="flex flex-col gap-7 px-100 py-16 h-90%">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt;
          <Link href="/WeekendMeals"> 주말 급식 신청 현황</Link> &gt;{" "}
          {`${grade}학년 ${classNumber}반`}
        </div>
        <div className="flex justify-between">
          <div className="flex font-sans text-heading4 text-gray-900 gap-4 items-center">
            주말 급식
          </div>
          <div className="flex items-center gap-5">
            <Dropdown type="grade" />
            <Dropdown type="class" />
          </div>
        </div>
        <div className="w-auto flex py-8 pl-8 bg-primary-1200 rounded-xl gap-28">
          <div className=" flex flex-col gap-9">
            <div className=" flex gap-36">
              <div className=" text-heading6-M text-gray-900">응답자</div>
              <div className=" text-caption1 text-neutral-300">
                응답자의 상태는 수정할 수 없습니다.
              </div>
            </div>
            <div className=" overflow-scroll scrollbar-hide flex flex-col gap-3">
              {/*컴포넌트는 만들었으나 api연결할때 오는 값보고 넣을 예정 */}
              {Data.name.map((name, index) => (
                <Classmeals
                  key={index}
                  number={Data.number[index]}
                  name={name}
                  state={Data.state[index]}
                />
              ))}
            </div>
          </div>
          <div className=" flex flex-col gap-9">
            <div className=" flex flex-col gap-1">
              <div className=" text-heading6-M text-gray-900">미응답자</div>
              <div className=" text-caption1 text-neutral-300">
                매달 5일 전까지 상태를 수정할 수 있습니다
              </div>
            </div>
            <div className=" overflow-scroll scrollbar-hide flex flex-col gap-3">
              {/*컴포넌트는 만들었으나 api연결할때 오는 값보고 넣을 예정 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekendMeals;
