"use client";
import React, { useState } from "react";
import { Calendar } from "../components/common/calendar/page";
import Modal from "../components/common/modal/page";
import Header from "../components/common/header/page";
import Link from "next/link";

const ChangeTeacher = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const data = {
    "2024-02-19": ["박현아 선생님", "육기준 선생님", "김도경 선생님"],
    "2024-02-20": ["ㅇㅇㅇ", "ㅇㅇㅇ", "ㅇㅇㅇ"],
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
      <Header teacher="박현아" />
      <div className=" flex flex-col px-100 py-12 gap-7">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; 자습 감독 선생님 변경
        </div>
        <Calendar data={data} onClick={handleChangeTeacher} />
        <div className=" absolute top-40 text-heading4">
          자습감독 선생님 변경
        </div>
        {modal && (
          <Modal
            teachers={data["2024-02-20"]} //api연결시 수정
            date={selectedDate}
            type="changeTeacher"
            heading1="자습감독 변경"
            buttonMessage="확인"
            onCancel={handleModalCancel}
            onConfirm={handleModalConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default ChangeTeacher;
