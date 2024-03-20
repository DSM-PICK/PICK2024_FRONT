"use client";
import React, { useState } from "react";
import Header from "../components/common/Header";
import Link from "next/link";
import ScheduleCalendar from "../components/common/calendar/schedule/page";
import { AddSchedule } from "@/apis/outList/list";
import moment from "moment";

interface ScheduleData {
  event_name: string;
  date: string;
}

const Schedule = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    event_name: "",
    date: "",
  });
  const { mutate: addScheduleMutate } = AddSchedule();

  const handleModalCancel = () => {
    setModal(false);
  };

  const formetDate = selectedDate
    ? moment(selectedDate).format("YYYY-MM-DD")
    : null;

  const handleModalConfirm = async () => {
    try {
      const newScheduleData: ScheduleData = {
        event_name: "",
        date: formetDate || "",
      };
      setScheduleData(newScheduleData);

      const result = await addScheduleMutate(newScheduleData, {
        onSuccess: () => {
          alert("일정이 추가되었습니다");
        },
        onError: (error) => {
          console.log(error);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col ">
      <Header />
      <div className="self-center flex flex-col py-12 gap-7">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; 일정 관리
        </div>
        <ScheduleCalendar onClick={() => {}} onChange={() => {}} />
        <div className=" min-w-max absolute top-40 text-heading4">
          일정 관리
        </div>
      </div>
    </div>
  );
};

export default Schedule;
