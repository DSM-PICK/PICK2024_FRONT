"use client";
import { CheckStatus, ClassStudentCheck } from "@/apis/selfStudy";
import useAcceptListSelection from "@/hook/hook";
import { getStudentString } from "@/utils/until";
import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import { BackGround } from "../components/common/background";
import Dropdown from "../components/common/dropdown";
import CheckList from "../components/common/list/after/check/page";
import Modal from "../components/common/modal/page";
import useAttendanceStore from "@/stores/useChangeStatus";

interface ClassCheck {
  id: string;
  username: string;
  grade: number;
  class_num: number;
  num: number;
  status6: string;
  status7: string;
  status8: string;
  status9: string;
  status10: string;
}

interface ChangeStatus {
  user_id: string;
  status_list: string[];
}

const SelfStudyCheck = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const [edit, setEdit] = useState<boolean>(false);
  const [saveModal, setSaveModal] = useState<boolean>(false);
  const { mutate: ChangeMutate } = CheckStatus();
  const { data: CheckMutate, refetch: ReCheckData } = ClassStudentCheck(
    selectedGrade,
    selectedClass
  );
  const { selectedStudentName, handleAcceptListClick } =
    useAcceptListSelection();
  const { addStudent, updateStatus, getStatus, students } =
    useAttendanceStore();

  const handleSaveModalConfirm = async () => {
    const updatedData: ChangeStatus[] = [];
    CheckMutate?.forEach((item) => {
      const localData = localStorage.getItem(item.id);
      if (localData) {
        const parsedData = JSON.parse(localData);
        const studentData = {
          user_id: item.id,
          status_list: [
            parsedData[0],
            parsedData[1],
            parsedData[2],
            parsedData[3],
            parsedData[4],
          ],
        };
        updatedData.push(studentData);
      }
    });

    try {
      await ChangeMutate(updatedData, {
        onSuccess: () => {
          ReCheckData();
        },
        onError: (error) => {
          alert(error.name);
        },
      });
      updatedData.forEach((item) => {
        localStorage.setItem(item.user_id, JSON.stringify(item.status_list));
      });
    } catch (error) {
      console.log(error);
    }
    setSaveModal(false);
  };

  const handleSaveModalCancel = () => {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.includes("-")) {
        localStorage.removeItem(key);
      }
    });
    setSaveModal(false);
  };

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

  const threeStyle =
    " bg-white flex justify-center items-center whitespace-nowrap text-label1 rounded-lg w-29%";

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
      <div className=" flex flex-col gap-8 w-full">
        <div className=" flex gap-20">
          <div className=" text-heading5 justify-center flex text-primary-100 w-40">
            {selectedGrade}-{selectedClass}
          </div>
          <div className="flex justify-between w-full">
            <div className={threeStyle}>8교시</div>
            <div className={threeStyle}>9교시</div>
            <div className={threeStyle}>10교시</div>
          </div>
        </div>
        <div className=" flex gap-20">
          <div className=" flex flex-col gap-6">
            {CheckMutate?.map((item, index) => (
              <div
                className="flex w-32 bg-white justify-center items-center h-14 rounded-lg text-label1"
                key={index}
              >
                {getStudentString(item)}
              </div>
            ))}
          </div>
          <div className=" w-full flex gap-x-11 gap-y-6 flex-wrap content-start">
            {edit ? (
              <>
                {CheckMutate?.map((item, index) => {
                  return (
                    <CheckList
                      key={index}
                      id={item.id}
                      state1={item.status6}
                      state2={item.status7}
                      state3={item.status8}
                      state4={item.status9}
                      state5={item.status10}
                    />
                  );
                })}
              </>
            ) : (
              <>
                {CheckMutate?.map((item, index) => {
                  return (
                    <CheckList
                      key={index}
                      id={item.id}
                      state1={item.status6}
                      state2={item.status7}
                      state3={item.status8}
                      state4={item.status9}
                      state5={item.status10}
                      onClick={() =>
                        handleAcceptListClick(item.id, item.username)
                      }
                      type="NO"
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      {saveModal && (
        <Modal
          type="button"
          heading1={`${
            selectedStudentName.length > 1
              ? `${selectedStudentName[0]} 학생 외 ${
                  selectedStudentName.length - 1
                }명`
              : selectedStudentName.length === 1
              ? `${selectedStudentName[0]} 학생`
              : ""
          }`}
          heading2="변경된 상태를 저장하시겠습니까?"
          buttonMessage="확인"
          onCancel={handleSaveModalCancel}
          onConfirm={handleSaveModalConfirm}
        />
      )}
    </BackGround>
  );
};

export default SelfStudyCheck;
