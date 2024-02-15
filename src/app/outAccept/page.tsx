"use client";
import React from "react";
import Header from "../components/common/header/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DoubleTab from "../components/common/tab/page";
import Button from "../components/common/button/page";
import { getFullToday, getToday } from "@/utils/date";
import { useState } from "react";
import { AcceptList } from "../components/common/list/accept/page";
import { Dropdown } from "../components/common/dropdown/page";
import Modal from "../components/common/modal/page";

const OutAccept = () => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const [refuse, setRefuse] = useState<boolean>(false);
  const [accept, setAccept] = useState<boolean>(false);
  const router = useRouter();
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const Data = {
    names: ["1410 강해민", "1410 rkkdk", "1410 박현아", "1410 누굴까"],
    times: ["11:20 ~ 11:20", "12:00 ~ 14:00", "13:30 ~ 18:00", "14:45 ~ 45:00"],
    whys: [],
  };

  const onClickTab = (tab: boolean) => {
    setSelectedTab(tab);
  };

  const Accept = () => {
    setAccept(true);
  };

  const Refuse = () => {
    setRefuse(true);
  };

  const Acceptconfirm = () => {
    setAccept(false);
  };

  const confirmReturn = () => {
    setRefuse(false);
  };
  const closeModal = () => {
    setRefuse(false);
  };

  const AcceptrCancel = () => {
    setAccept(false);
  };
  const handleAcceptListClick = (student: string) => {
    const isStudentSelected = selectedStudents.includes(student);
    if (isStudentSelected) {
      setSelectedStudents((prevSelectedStudents) =>
        prevSelectedStudents.filter(
          (selectedStudent) => selectedStudent !== student
        )
      );
    } else {
      setSelectedStudents((prevSelectedStudents) => [
        ...prevSelectedStudents,
        student,
      ]);
    }
    console.log(selectedStudents);
  };

  return (
    <div className="h-dvh">
      <Header teacher="박현아" />
      <div className="flex flex-col gap-7 px-100 py-16 h-90%">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; 외출 수락
        </div>
        <div className="flex justify-between">
          <div className="flex font-sans text-heading4 text-gray-900 gap-4 items-center">
            외출 수락
            <div className="text-neutral-200 text-heading5">
              {getFullToday()}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <DoubleTab
              firstChildren="층 별로 보기"
              secondChildren="반 별로 보기"
              onClick={onClickTab}
            />
            {selectedTab ? (
              <Dropdown type="floor" />
            ) : (
              <>
                <Dropdown type="grade" />
                <Dropdown type="class" />
              </>
            )}
          </div>
        </div>
        <div className="w-auto rounded-xl bg-primary-1200 h-full px-10 py-10 flex flex-col justify-between items-end">
          <div>
            {selectedTab ? (
              <div className="flex flex-wrap gap-5 justify-between">
                {Data.names.map((name, index) => (
                  <AcceptList
                    onClick={() => handleAcceptListClick(name)}
                    key={index}
                    time={Data.times[index]}
                    student={name}
                    why={Data.whys[index]}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-5 justify-between">
                {Data.names.map((name, index) => (
                  <AcceptList
                    onClick={() => handleAcceptListClick(name)}
                    key={index}
                    time={Data.times[index]}
                    student={name}
                    why={Data.whys[index]}
                  />
                ))}
              </div>
            )}
          </div>
          <div className=" flex gap-5">
            <Button
              colorType="ghost"
              children="거절하기"
              buttonSize="medium"
              onClick={() => {
                Refuse();
              }}
            />
            <Button
              colorType="primary"
              children="수락하기"
              buttonSize="medium"
              onClick={() => {
                Accept();
              }}
            />
          </div>
        </div>
        {refuse && (
          <Modal
            heading1={`${
              selectedStudents.length > 1
                ? `${selectedStudents[0]} 학생 외 ${
                    selectedStudents.length - 1
                  }명`
                : selectedStudents.length === 1
                ? `${selectedStudents[0]} 학생`
                : ""
            }`}
            heading2={`외출을 거절하시겠습니까?`}
            type="error"
            buttonMessage="거절"
            onCancel={closeModal}
            onConfirm={confirmReturn}
          />
        )}
        {accept && (
          <Modal
            heading1={`${
              selectedStudents.length > 1
                ? `${selectedStudents[0]} 학생 외 ${
                    selectedStudents.length - 1
                  }명`
                : selectedStudents.length === 1
                ? `${selectedStudents[0]} 학생`
                : ""
            }`}
            heading2={`외출을 수락하시겠습니까?`}
            type="button"
            buttonMessage="수락"
            onCancel={AcceptrCancel}
            onConfirm={Acceptconfirm}
          />
        )}
      </div>
    </div>
  );
};

export default OutAccept;
