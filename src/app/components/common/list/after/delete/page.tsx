"use client";

import React, { useState } from "react";
import { Button } from "../../..";
import Modal from "../../../modal/page";

interface AfterdeleteProps {
  student: string;
  onDelete: () => void; // onDelete 콜백 함수 추가
}

export const AfterDelete: React.FC<AfterdeleteProps> = ({
  student,
  onDelete,
}) => {
  const [modal, setModal] = useState<boolean>(false);

  const deleteStudent = () => {
    setModal(true);
  };

  const modalCancel = () => {
    setModal(false);
  };

  const modalConfirm = () => {
    onDelete();
    setModal(false);
  };

  return (
    <div className="flex bg-white py-2 px-4 justify-between w-77 items-center rounded-lg">
      <div className="text-label1">{student}</div>
      <div className="flex w-20">
        <Button
          children="삭제"
          buttonSize="extraSmall"
          onClick={deleteStudent}
          colorType="primary"
        />
      </div>
      {modal && (
        <Modal
          type="error"
          heading1={`${student}학생을`}
          heading2="방과후에서 삭제하시겠습니까?"
          onCancel={modalCancel}
          onConfirm={modalConfirm}
          buttonMessage="삭제"
        />
      )}
    </div>
  );
};
