"use client";
import React, { useState } from "react";
import Header from "../components/common/Header";
import Link from "next/link";
import ScheduleCalendar from "../components/common/calendar/schedule/page";
import { AddSchedule } from "@/apis/outList/list";
import moment from "moment";

interface ScheduleData {
  name: string;
  date: string;
}

const Schedule = () => {


  return (
    <div className=" flex flex-col">
      <Header />
      <div className=" self-center flex flex-col py-12 gap-7">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; 일정 관리
        </div>
        <ScheduleCalendar onClick={()=>{}} onChange={() => {}} />
        <div className=" min-w-max absolute top-40 text-heading4">
          일정 관리
        </div>
      </div>
    </div>
  );
};

export default Schedule;
