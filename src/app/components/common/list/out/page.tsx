import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../button/page";
import Modal from "../../modal/page";

interface OutProps {
  student: string;
  returnTime: string;
}

export const Out: React.FC<OutProps> = ({ student, returnTime }) => {
  const router = useRouter();

  const preOut = () => {
    router.push("/outlist/previous");
  };

  const returnStudent = () => {
    setModal(true);
  };

  const confirmReturn = () => {
    setModal(false);
  };

  const closeModal = () => {
    setModal(false);
  };

  const [modal, setModal] = useState<boolean>(false);

  return (
    <div className="rounded-lg flex justify-between items-center bg-white py-6 px-4 w-120">
      <div className="flex items-center gap-3">
        <div className="font-sans text-Button-L">{student}</div>
        <div className="font-sans text-caption1 text-neutral-400">
          {returnTime} 복귀예정
        </div>
      </div>
      <div className="flex gap-2 w-42">
        <Button
          colorType="ghost"
          children="이전외출"
          buttonSize="extraSmall"
          onClick={preOut}
        />
        <Button
          colorType="primary"
          children="복귀"
          buttonSize="extraSmall"
          onClick={returnStudent}
        />
      </div>
      {modal && (
        <Modal
          heading1={`${student} 학생의`}
          heading2="외출을 수락하시겠습니까?"
          type="button"
          buttonMessage="확인"
          onCancel={closeModal}
          onConfirm={confirmReturn}
        />
      )}
    </div>
  );
};