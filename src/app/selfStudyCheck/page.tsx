"use client";
import { useRouter } from "next/navigation";
import Button from "../components/common/Button";
import { BackGround } from "../components/common/background";
import Dropdown from "../components/common/dropdown";
import { useState } from "react";

const SelfStudyCheck = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const [edit, setEdit] = useState<boolean>(false);
  const [saveModal, setSaveModal] = useState<boolean>(false);
  const router = useRouter();

  const Change = () => {};

  const onClickEdit = () => {
    setEdit(true);
  };

  const onClickSave = () => {
    setSaveModal(true);
    setEdit(false);
  };

  const handleGradeChange = (selectedOption: number) => {
    setSelectedGrade(selectedOption);
  };

  const handleClassChange = (selectedOption: number) => {
    setSelectedClass(selectedOption);
  };

  return (
    <BackGround
      subTitle="출석 체크"
      secondTitle=""
      linkChildren="출석 체크"
      DropChildren={
        <div className=" flex gap-5 items-center">
          {edit ? (
            <Button colorType="ghost" buttonSize="small" onClick={onClickSave}>
              출결 저장하기
            </Button>
          ) : (
            <Button colorType="ghost" buttonSize="small" onClick={onClickEdit}>
              출결 체크하기
            </Button>
          )}
          <div className=" flex gap-5">
            <Dropdown type="grade" onChange={handleGradeChange} />
            <Dropdown type="class" onChange={handleClassChange} />
          </div>
        </div>
      }
    >
      d
    </BackGround>
  );
};

export default SelfStudyCheck;
