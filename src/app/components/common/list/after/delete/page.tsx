"use client";

import React, { useState } from "react";
import Button from "../../../Button";
import Modal from "../../../modal/page";
import { AfterStudentDelete } from "@/apis/afterManage";

interface AfterdeleteProps {
  student: string;
  id: string;
}

const AfterDelete: React.FC<AfterdeleteProps> = ({ student, id }) => {
  const [modal, setModal] = useState<boolean>(false);
  const { mutate: DeleteMutate } = AfterStudentDelete();

  const deleteStudent = () => {
    setModal(true);
  };

  const modalCancel = () => {
    setModal(false);
  };

  const onDelete = async () => {
    try {
      await DeleteMutate(
        { id },
        {
          onSuccess() {
            location.reload();
            alert("삭제되었습니다");
          },
          onError(error) {
            alert(`${error.name}이 발생하였습니다`);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const modalConfirm = () => {
    onDelete();
    setModal(false);
  };

  return (
    <div className="flex bg-white py-2 px-4 justify-between w-29% items-center rounded-lg">
      <div className="text-label1">{student}</div>
      <div className="flex w-20">
        <Button
          buttonSize="extraSmall"
          onClick={deleteStudent}
          colorType="primary"
        >
          삭제
        </Button>
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

export default AfterDelete;
