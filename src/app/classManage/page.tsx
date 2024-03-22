"use client";
import Link from "next/link";
import Modal from "../components/common/modal/page";
import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Dropdown from "../components/common/dropdown";
import Button from "../components/common/Button";
import ManageList from "../components/common/list/manage/page";
import { getStudentData } from "@/apis/classManage";
import { getStudentString, setStudentNum } from "@/utils/until";

enum ManageState {
  취업 = "취업",
  자퇴 = "자퇴",
  출석 = "출석",
  현체 = "현체",
  귀가 = "귀가",
}

interface StudentData {
  userId: string;
  name: string;
  grade: number;
  classNum: number;
  num: number;
  status: string;
}

const ClassManage: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const [data, setData] = useState<StudentData[]>();
  const { mutate: getStudentDataMutate } = getStudentData();

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
  };

  const handleModalCancel = () => {
    setModal(false);
  };

  const changeStatusName = (item: string) => {
    switch (item) {
      case "ATTENDANCE":
        return "출석";
      case "GO_OUT":
        return "외출";
      case "EMPLOYMENT":
        return "취업";
      case "DISALLOWED":
        return "무단";
      case "NOT_COMEBACK":
        return "미복귀";
      case "DROPOUT":
        return "자퇴";
      default:
        return "";
    }
  };

  return (
    <div className=" h-dvh flex flex-col">
      <Header />
      <div className=" h-90dvl self-center w-3/5  flex flex-col py-12 gap-7">
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
                buttonSize="small"
                onClick={onClickSave}
              >
                상태 저장하기
              </Button>
            ) : (
              <Button
                colorType="ghost"
                buttonSize="small"
                onClick={onClickEdit}
              >
                상태 수정하기
              </Button>
            )}
            <Dropdown type="grade" onChange={handleGradeChange} />
            <Dropdown type="class" onChange={handleClassChange} />
          </div>
        </div>
        <div className="w-auto content-start rounded-xl bg-primary-1200 h-140 px-10 py-10 overflow-y-scroll scrollbar-hide flex flex-wrap gap-x-16 gap-y-5">
          {edit
            ? data?.map((item, index) => (
                <ManageList
                  key={index}
                  student={`${setStudentNum(item)} ${item.name}`}
                  state={changeStatusName(item.status)}
                  edit={false}
                />
              ))
            : data?.map((item, index) => (
                <ManageList
                  key={index}
                  student={`${setStudentNum(item)} ${item.name}`}
                  state={changeStatusName(item.status)}
                  edit={true}
                />
              ))}
        </div>
        {modal && (
          <Modal
            type="button"
            heading1={`${data?.length || 0} 명의`}
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
