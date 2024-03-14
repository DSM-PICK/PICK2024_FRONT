"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../Button";
import Modal from "../../modal/page";
import { ReturnSchool } from "@/apis/outList/list";

interface OutProps {
  student: string;
  returnTime: string;
  id: string;
}

const Out: React.FC<OutProps> = ({ student, returnTime, id }) => {
  const router = useRouter();
  const { mutate: returnSchoolMutate } = ReturnSchool();

  const preOut = () => {
    router.push(`/outList/query?name=${student}`);
  };

  const returnStudent = () => {
    setModal(true);
  };

  const exid = id;

  const confirmReturn = async () => {
    try {
      const result = await returnSchoolMutate(
        { id: exid },
        {
          onSuccess: () => {
            console.log("성공");
            alert("복귀에 성공하셨습니다");
          },
          onError: () => {
            console.log("에러발생");
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
    setModal(false);
  };

  const closeModal = () => {
    setModal(false);
  };

  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      <div className="rounded-lg flex justify-between items-center bg-white py-6 px-4 w-120">
        <div className="flex items-center gap-3">
          <div className="font-sans text-Button-L">{student}</div>
          <div className="font-sans text-caption1 text-neutral-400">
            {returnTime} 복귀예정
          </div>
        </div>
        <div className="flex gap-2 w-42">
          <Button colorType="ghost" buttonSize="extraSmall" onClick={preOut}>
            이전외출
          </Button>
          <Button
            colorType="primary"
            buttonSize="extraSmall"
            onClick={returnStudent}
          >
            복귀
          </Button>
        </div>
        {modal && (
          <Modal
            heading1={`${student} 학생의`}
            heading2="외출을 끝내시겠습니까?"
            type="button"
            buttonMessage="확인"
            onCancel={closeModal}
            onConfirm={confirmReturn}
          />
        )}
      </div>
    </>
  );
};

export default Out;
