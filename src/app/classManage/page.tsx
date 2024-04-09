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

interface ChangeStatusData {
  user_id: string;
  status_type: string;
}

const ClassManage: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const [data, setData] = useState<StudentData>();
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedStudentName, setSelectedStudentName] = useState<string[]>([]);
  const [modifiedStudents, setModifiedStudents] = useState<ChangeStatusData[]>(
    []
  );
  const { mutate: getStudentDataMutate } = GetStudentData();
  const { mutate: changestatusMutate } = ChangeStatus();

  const get = async () => {
    try {
      const result = await getStudentDataMutate(
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

  const handleAcceptListClick = (
    user_id: string,
    status_type: string,
    name: string
  ) => {
    setModifiedStudents((prevModifiedStudents) => [
      ...prevModifiedStudents,
      { user_id, status_type },
    ]);

    const isStudentSelected = selectedStudents.includes(user_id);
    if (isStudentSelected) {
      setSelectedStudents((prevSelectedStudents) =>
        prevSelectedStudents.filter(
          (selectedStudent) => selectedStudent !== user_id
        )
      );
      setSelectedStudentName((prevSelectedStudentName) =>
        prevSelectedStudentName.filter(
          (selectedStudentName) => selectedStudentName !== name
        )
      );
    } else {
      setSelectedStudents((prevSelectedStudents) => [
        ...prevSelectedStudents,
        user_id,
      ]);
      setSelectedStudentName((prevSelectedStudentName) => [
        ...prevSelectedStudentName,
        name,
      ]);
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
          <div className=" flex gap-5">
            <Dropdown type="grade" onChange={handleGradeChange} />
            <Dropdown type="class" onChange={handleClassChange} />
          </div>
        </>
      }
    >
      {edit &&
        data?.students.map((student, index) => (
          <ManageList
            key={index}
            student={`${setStudentNum(student)} ${student.name}`}
            state={changeStatusName(student.status)}
            edit={false}
            onChange={(status) =>
              handleAcceptListClick(student.user_id, status, student.name)
            }
          />
        ))}
      {!edit &&
        data?.students.map((student, index) => (
          <ManageList
            key={index}
            student={`${setStudentNum(student)} ${student.name}`}
            state={changeStatusName(student.status)}
            edit={true}
            onChange={(status) =>
              handleAcceptListClick(student.user_id, status, student.name)
            }
          />
        ))}
      {modal && (
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
          onCancel={handleModalCancel}
          onConfirm={handleModalConfirm}
        />
      )}
    </BackGround>
  );
};

export default ClassManage;
