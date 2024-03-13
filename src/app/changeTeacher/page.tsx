"use client";
import React, { useEffect, useState } from "react";
import Calendar from "../components/common/calendar/page";
import Header from "../components/common/Header";
import Link from "next/link";

interface data {
  floor: number;
  teacher: string;
  date: string;
}

const ChangeTeacher = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectDate, setSelectedDate] = useState<Date | null>(null);
  const [data, setData] = useState<data[]>([]);

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
          <Link href="/main">홈</Link> &gt; 자습 감독 선생님 변경
        </div>
        <Calendar onClick={handleChangeTeacher} onChange={() => {}} />
        <div className=" absolute top-40 text-heading4">
          자습감독 선생님 변경
        </div>
      </div>
    </div>
  );
};

export default ChangeTeacher;
