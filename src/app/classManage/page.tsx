"use client";
import React, { useEffect, useState } from "react";
import Modal from "../components/common/modal/page";
import Dropdown from "../components/common/dropdown";
import Button from "../components/common/Button";
import ManageList from "../components/common/list/manage/page";
import { GetStudentData } from "@/apis/classManage";
import { setStudentNum } from "@/utils/until";
import { ChangeStatus } from "@/apis/classManage";
import { BackGround } from "../components/common/background";
import useManageListSelection from "@/hook/useManageListSelection";

interface Student {
  user_id: string;
  name: string;
  grade: number;
  class_num: number;
  num: number;
  status: string;
}
interface StudentData {
  teacher: string;
  students: Student[];
}

const ClassManage: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const [data, setData] = useState<StudentData>();
  const {
    selectedStudents,
    selectedStudentNames,
    modifiedStudents,
    handleManageListClick,
  } = useManageListSelection();
  const { mutate: getStudentDataMutate } = GetStudentData();
  const { mutate: changestatusMutate } = ChangeStatus();

  useEffect(() => {
    const grade = parseInt(localStorage.getItem("grade") || "1", 10);
    const class_num = parseInt(localStorage.getItem("class_num") || "1", 10);
    const setgrade = grade === 0 ? 1 : grade;
    const setclass_num = class_num === 0 ? 1 : class_num;
    setSelectedGrade(setgrade);
    setSelectedClass(setclass_num);
  }, []);

  const get = async () => {
    try {
      await getStudentDataMutate(
        { grade: selectedGrade, class_num: selectedClass },
        {
          onSuccess: (data) => {
            setData(data);
          },
          onError: (error) => {
            alert(`${error.message} : 에러가 발생되었습니다`);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const Change = async () => {
    try {
      await changestatusMutate(modifiedStudents, {
        onSuccess: () => {
          location.reload();
        },
        onError: (error) => {
          alert(error.name);
          console.log(error.message);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get();
  }, [selectedGrade, selectedClass]);

  const handleGradeChange = (selectedOption: number) => {
    setSelectedGrade(selectedOption);
  };

  const handleClassChange = (selectedOption: number) => {
    setSelectedClass(selectedOption);
  };

  const onClickEdit = () => {
    setEdit(true);
  };

  const onClickSave = () => {
    setModal(true);
    setEdit(false);
  };

  const handleModalConfirm = () => {
    setModal(false);
    if (data && data.students) {
      Change();
    }
  };

  const handleModalCancel = () => {
    setModal(false);
  };

  const changeStatusName = (status: string) => {
    switch (status) {
      case "ATTENDANCE":
        return "출석";
      case "PICNIC":
        return "현체";
      case "EMPLOYMENT":
        return "취업";
      case "GO_HOME":
        return "귀가";
      case "DROPOUT":
        return "자퇴";
      default:
        return "";
    }
  };

  return (
    <BackGround
      subTitle={`${selectedGrade}학년 ${selectedClass}반`}
      secondTitle={`담임 ${data?.teacher}선생님`}
      linkChildren="학급 관리"
      DropChildren={
        <>
          {edit ? (
            <Button colorType="ghost" buttonSize="small" onClick={onClickSave}>
              상태 저장하기
            </Button>
          ) : (
            <Button colorType="ghost" buttonSize="small" onClick={onClickEdit}>
              상태 수정하기
            </Button>
          )}
          <div className="flex gap-5">
            <Dropdown type="grade" onChange={handleGradeChange} />
            <Dropdown type="class" onChange={handleClassChange} />
          </div>
        </>
      }
    >
      {data?.students.map((student, index) => (
        <ManageList
          key={index}
          student={`${setStudentNum(student)} ${student.name}`}
          state={changeStatusName(student.status)}
          edit={!edit}
          onChange={(status) =>
            handleManageListClick(student.user_id, status, student.name)
          }
        />
      ))}
      {modal && (
        <Modal
          type="button"
          heading1={`${
            selectedStudentNames.length > 1
              ? `${selectedStudentNames[0]} 학생 외 ${
                  selectedStudentNames.length - 1
                }명`
              : selectedStudentNames.length === 1
              ? `${selectedStudentNames[0]} 학생`
              : ""
          }`}
          heading2="변경된 상태를 저장하시겠습니까?"
          buttonMessage="확인"
          onCancel={handleModalCancel}
          onConfirm={handleModalConfirm}
        />
      )}
    </BackGround>
  );
};

export default ClassManage;
