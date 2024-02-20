"use client";
import Link from "next/link";
import Modal from "../components/common/modal/page";
import react, { useState } from "react";
import Header from "../components/common/header/page";
import { getFullToday } from "@/utils/date";
import { Dropdown } from "../components/common/dropdown/page";
import Button from "../components/common/button/page";
import { ManageList } from "../components/common/list/manage/page";

const ClassManage = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const onClickEdit = () => {
    setEdit(true);
  };

  const onClickSave = () => {
    setModal(true);
    setEdit(false);
  };

  const handleModalConfirm = () => {
    setModal(false);
  };

  const handleModalCancel = () => {
    setModal(false);
  };

  const datalist = {
    name: [
      "1410 박현아",
      "1410 박수현",
      "1410 강해민",
      "1410 육기준",
      "1410 김도경",
      "1410 조영준",
    ],
    state: ["취업", "자퇴", "출석", "현체", "귀가", "출석"],
  };
  return (
    <div className=" h-dvh">
      <Header teacher="박현아" />
      <div className=" h-full flex flex-col px-100 py-12 gap-7">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; 학급 관리
        </div>
        <div className="flex justify-between">
          <div className="flex font-sans text-heading4 text-gray-900 gap-4 items-center">
            {/*api연동할때 데이터 오는 값보고 작성 예정 */}
            <div className="text-neutral-200 text-heading5">
              {getFullToday()}
            </div>
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
        <div className="w-full content-start rounded-xl bg-primary-1200 h-full px-10 py-10 overflow-y-scroll scrollbar-hide flex flex-wrap gap-x-16 gap-y-5">
          {edit
            ? datalist.name.map((student, index) => (
                <ManageList
                  key={index}
                  student={student}
                  state={datalist.state[index]}
                  edit={false}
                />
              ))
            : datalist.name.map((student, index) => (
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
            heading1={`${datalist}외 1명의`} //api연동하면서 수정할 예정
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
