"use client";
import Header from "@/app/components/common/Header";
import Dropdown from "@/app/components/common/dropdown";
import PreviousList from "@/app/components/common/list/before";
import Link from "next/link";
import { useState } from "react";

const Previous = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<number>(1);

  const handleGradeChange = (selectedOption: number) => {
    setSelectedGrade(selectedOption);
  };

  const handleClassChange = (selectedOption: number) => {
    setSelectedClass(selectedOption);
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className=" self-center flex flex-col gap-7 py-16 h-90dvh w-3/5">
        <div className="text-neutral-200 text-sub-title3-B text-nowrap">
          <Link href="/main">홈</Link> &gt;
          <Link href="/outAccept"> 외출 수락</Link> &gt; 외출 기록 보기
        </div>
        <div className=" flex justify-between items-center gap-3 flex-wrap">
          <div className=" text-nowrap flex justify-center items-center font-sans text-heading4 text-gray-900">
            외출 기록 보기
          </div>
          <div className=" flex items-center gap-3">
            <Dropdown type="grade" onChange={handleGradeChange} />
            <Dropdown type="class" onChange={handleClassChange} />
          </div>
        </div>
        <div className="w-full gap-4 rounded-xl bg-primary-1200 h-full px-10 py-10 overflow-y-scroll scrollbar-hide ">
          <div className="flex gap-4 flex-wrap justify-between">
            <PreviousList />
            <PreviousList />
            <PreviousList />
            <PreviousList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Previous;
