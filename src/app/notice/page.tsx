"use client";
import React, { useState } from "react";
import Modal from "../components/common/modal/page";
import Header from "../components/common/Header";
import Link from "next/link";
import { ScheduleCalendar } from "../components/common/calendar/schedule/page";
import { addSchedule } from "@/apis/outList/list";
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
  const { mutate: addScheduleMutate } = addSchedule();

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
    <div>
      <Header />
      <div className="flex flex-col px-100 py-12 gap-7">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; 일정 관리
        </div>
        <ScheduleCalendar onClick={handleChangeTeacher} onChange={() => {}} />
        <div className="absolute top-40 text-heading4">일정 관리</div>
        {modal && (
          <Modal
            date={selectedDate}
            type="addSchedule"
            heading1="새로운 일정"
            buttonMessage="추가"
            onCancel={handleModalCancel}
            onConfirm={handleModalConfirm}
            scheduleData={scheduleData} // scheduleData를 Modal 컴포넌트로 전달
          />
        )}
      </div>
    </div>
  );
};

export default Schedule;
