"use client";
import React, { useState } from "react";
import Modal from "../components/common/modal/page";
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
  const [modal, setModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    name: "",
    date: "",
  });
  const { mutate: addScheduleMutate } = AddSchedule();

  const handleChangeTeacher = (date: Date) => {
    setSelectedDate(date);
    setModal(true);
  };

  const handleModalCancel = () => {
    setModal(false);
  };

  const formetDate = selectedDate
    ? moment(selectedDate).format("YYYY-MM-DD")
    : null;

  const handleModalConfirm = async () => {
    try {
      const newScheduleData: ScheduleData = {
        name: "",
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
    <div className=" min-w-fit">
      <Header />
      <div className=" min-w-max flex flex-col 3xl:px-100 px-30 py-12 gap-7">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; 일정 관리
        </div>
        <ScheduleCalendar onClick={handleChangeTeacher} onChange={() => {}} />
        <div className=" min-w-max absolute top-40 text-heading4">
          일정 관리
        </div>
      </div>
    </div>
  );
};

export default Schedule;
