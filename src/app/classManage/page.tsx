"use client";
import Link from "next/link";
import Modal from "../components/common/modal/page";
import react, { useState } from "react";
import Header from "../components/common/header/page";
import { getFullToday } from "@/utils/date";
import Dropdown from "../components/common/dropdown/page";
import Button from "../components/common/button/page";
import { ManageList } from "../components/common/list/manage/page";
import React from "react";

enum ManageState {
  취업 = "취업",
  자퇴 = "자퇴",
  출석 = "출석",
  현체 = "현체",
  귀가 = "귀가",
}

type ManageProps = {
  student: string[];
  state: ManageState[];
  edit: boolean;
};

const ClassManage: React.FC<ManageProps> = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const onClickEdit = () => {
    setEdit(true);
  };

  console.log(setEdit);

  const onClickSave = () => {
    setModal(true);
    setEdit(false);
  };

  const datalist: ManageProps = {
    student: [
      "1410 박현아",
      "1410 박수현",
      "1410 강해민",
      "1410 육기준",
      "1410 김도경",
      "1410 조영준",
    ],
    state: [
      ManageState.취업,
      ManageState.자퇴,
      ManageState.귀가,
      ManageState.출석,
      ManageState.현체,
      ManageState.출석,
    ],
    edit,
  };
  const handleModalConfirm = () => {
    setModal(false);
  };

  const handleModalCancel = () => {
    setModal(false);
  };

  return (
    <div className=" h-dvh">
      <Header />
      <div className=" h-90% flex flex-col px-100 py-12 gap-7">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; 학급 관리
        </div>
        <div className="flex justify-between">
          <div className="flex font-sans text-heading4 text-gray-900 gap-4 items-center">
            <div className="text-neutral-200 text-heading5">1학년 1반</div>
          </div>
          <div className="flex items-center gap-5">
            {edit ? (
              <Button
                colorType="ghost"
                children="상태 저장하기"
                buttonSize="small"
                onClick={onClickSave}
              />
            ) : (
              <Button
                colorType="ghost"
                children="상태 수정하기"
                buttonSize="small"
                onClick={onClickEdit}
              />
            )}
            <Dropdown type="grade" />
            <Dropdown type="class" />
          </div>
        </div>
        <div className="w-full content-start rounded-xl bg-primary-1200 h-90% px-10 py-10 overflow-y-scroll scrollbar-hide flex flex-wrap gap-x-16 gap-y-5">
          {edit
            ? datalist.student.map((student, index) => (
                <ManageList
                  key={index}
                  student={student}
                  state={datalist.state[index]}
                  edit={false}
                />
              ))
            : datalist.student.map((student, index) => (
                <ManageList
                  key={index}
                  student={student}
                  state={datalist.state[index]}
                  edit={true}
                />
              ))}
        </div>
        {modal && (
          <Modal
            type="button"
            heading1={`${datalist.student[0]}외 ${datalist.state.length}명의`}
            heading2="변경된 상태를 저장하시겠습니까?"
            buttonMessage="확인"
            onCancel={handleModalCancel}
            onConfirm={handleModalConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default ClassManage;