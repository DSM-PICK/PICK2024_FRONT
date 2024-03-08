"use client";
import React, { useState } from "react";
import { Calendar } from "../components/common/calendar/page";
import Modal from "../components/common/modal/page";
import Header from "../components/common/header/page";
import Link from "next/link";

const Schedule = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const data = {
    "2024-02-19": ["빨리빨리", "퍼블리싱해라!"],
    "2024-02-20": ["퍼블리싱 마감"],
  };

  const handleChangeTeacher = (date: Date) => {
    setSelectedDate(date);
    setModal(true);
  };

  const handleModalCancel = () => {
    setModal(false);
  };

  const handleModalConfirm = () => {
    setModal(false);
  };

  return (
    <div>
      <Header />
      <div className=" flex flex-col px-100 py-12 gap-7">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; 일정 관리
        </div>
        <Calendar data={data} onClick={handleChangeTeacher} />
        <div className=" absolute top-40 text-heading4">일정 관리</div>
        {modal && (
          <Modal
            date={selectedDate}
            type="addSchedule"
            heading1="새로운 일정"
            buttonMessage="추가"
            onCancel={handleModalCancel}
            onConfirm={handleModalConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default Schedule;
