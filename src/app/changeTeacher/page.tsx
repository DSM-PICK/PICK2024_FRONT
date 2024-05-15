"use client";
import React from "react";
import Calendar from "../components/common/calendar";
import Header from "../components/common/Header";
import Link from "next/link";

const ChangeTeacher = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className=" self-center flex flex-col py-12 gap-7">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; 자습 감독 선생님 변경
        </div>
        <Calendar />
        <div className=" min-w-max absolute top-40 text-heading4">
          자습감독 선생님 변경
        </div>
      </div>
    </div>
  );
};

export default ChangeTeacher;
