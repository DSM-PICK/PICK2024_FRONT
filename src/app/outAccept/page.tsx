"use client";
import React, { useEffect, useState } from "react";
import DoubleTab from "../components/common/tab/page";
import Button from "../components/common/Button";
import { getFullToday } from "@/utils/date";
import AcceptList from "../components/common/list/accept/page";
import Dropdown from "../components/common/dropdown";
import Modal from "../components/common/modal/page";
import { useGetClass, useOutAccept } from "@/apis/outAccept/outAccept";
import { getStudentString } from "@/utils/until";
import { useRouter } from "next/navigation";
import { BackGround } from "../components/common/background";
import useAcceptListSelection from "@/hook/hook";

const OutAccept = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const [refuse, setRefuse] = useState<boolean>(false);
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  const [selectedClass, setSelectedClass] = useState<number>(5);
  const [accept, setAccept] = useState<boolean>(false);
  const { selectedStudents, selectedStudentName, handleAcceptListClick } =
    useAcceptListSelection();
  const { mutate: outAcceptMutate } = useOutAccept();
  const { data: getClassMutate, refetch: ReGetClassMutate } = useGetClass(
    selectedGrade,
    selectedClass,
    selectedTab ? "application" : "early-return"
  );

  const onClickTab = (tab: boolean) => {
    setSelectedTab(tab);
  };

  const handleGradeChange = (selectedOption: number) => {
    if (selectedOption === 5) {
      setSelectedGrade(5);
      setSelectedClass(5);
    } else {
      setSelectedGrade(selectedOption);
    }
  };

  const handleClassChange = (selectedOption: number) => {
    if (selectedGrade === 5) {
      alert("학년을 선택해주세요");
      setSelectedClass(selectedOption);
    } else {
      setSelectedClass(selectedOption);
    }
  };

  useEffect(() => {
    const grade = parseInt(localStorage.getItem("grade") || "1", 10);
    const class_num = parseInt(localStorage.getItem("class_num") || "1", 10);
    const setgrade = grade === 0 ? 5 : grade;
    const setclass_num = class_num === 0 ? 5 : class_num;
    setSelectedGrade(setgrade);
    setSelectedClass(setclass_num);
  }, []);

  const Acceptconfirm = async () => {
    try {
      if (selectedGrade && selectedClass) {
        const reqOption = selectedTab ? "application" : "early-return";
        await outAcceptMutate(
          {
            type: reqOption,
            status: "OK",
            id_list: selectedStudents,
          },
          {
            onSuccess: () => {
              setAccept(false);
              ReGetClassMutate();
            },
            onError: () => {
              setAccept(false);
            },
          }
        );
      }
    } catch (error) {
      alert("외출 수락에 실패하였습니다");
      setAccept(false);
    }
  };

  const acceptColor = () => {
    if (selectedStudents.length === 0) {
      return "solidDisabled";
    }
    return "primary";
  };

  const refuseColor = () => {
    if (selectedStudents.length === 0) {
      return "ghostDisabled";
    }
    return "ghost";
  };

  const Accept = () => {
    if (selectedStudents.length === 0) {
      alert("외출 수락 할 학생을 선택해주세요");
    } else setAccept(true);
  };

  const Refuse = () => {
    if (selectedStudents.length === 0) {
      alert("외출 거절 할 학생을 선택해주세요");
    } else setRefuse(true);
  };

  const confirmReturn = async () => {
    try {
      if (selectedGrade && selectedClass) {
        const reqOption = selectedTab ? "application" : "early-return";
        await outAcceptMutate(
          {
            type: reqOption,
            status: "NO",
            id_list: selectedStudents,
          },
          {
            onSuccess: () => {
              setRefuse(false);
              ReGetClassMutate();
            },
            onError: () => {
              setRefuse(false);
            },
          }
        );
      }
    } catch (error) {
      alert("외출 거절에 실패하였습니다");
      setRefuse(false);
    }
  };

  const closeModal = () => {
    setRefuse(false);
  };

  const AcceptrCancel = () => {
    setAccept(false);
  };

  return (
    <BackGround
      linkChildren="외출 수락"
      subTitle="외출 수락"
      secondTitle={getFullToday()}
      DropChildren={
        <>
          <Button
            colorType="ghost"
            buttonSize="small"
            onClick={() => router.push("/outAccept/previous")}
          >
            외출 기록보기
          </Button>
          <div className=" flex gap-5">
            {selectedTab ? (
              <>
                <Dropdown type="all" onChange={handleGradeChange} homeRoom />
                <Dropdown type="class" onChange={handleClassChange} homeRoom />
              </>
            ) : (
              <>
                <Dropdown type="all" onChange={handleGradeChange} homeRoom />
                <Dropdown type="class" onChange={handleClassChange} homeRoom />
              </>
            )}
          </div>
        </>
      }
    >
      <div className=" gap-5 flex flex-col">
        <DoubleTab
          firstChildren="외출"
          secondChildren="조기귀가"
          onClick={onClickTab}
        />
        {selectedTab ? (
          <div className="flex flex-wrap gap-5 justify-between">
            {getClassMutate?.map((dataItem, index) => (
              <AcceptList
                onClick={() =>
                  handleAcceptListClick(dataItem.id, dataItem.user_name)
                }
                key={index}
                time={`${dataItem.start} ~ ${dataItem.end}`}
                student={getStudentString(dataItem)}
                why={`${dataItem.reason}`}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-5 justify-between">
            {getClassMutate?.map((dataItem, index) => (
              <AcceptList
                onClick={() =>
                  handleAcceptListClick(dataItem.id, dataItem.user_name)
                }
                key={index}
                time={`${dataItem.start} ~`}
                student={`${getStudentString(dataItem)}`}
                why={dataItem.reason}
              />
            ))}
          </div>
        )}
      </div>
      <div className=" flex gap-5 w-full justify-end">
        <Button
          colorType={refuseColor()}
          buttonSize="medium"
          onClick={() => {
            Refuse();
          }}
        >
          거절하기
        </Button>
        <Button
          colorType={acceptColor()}
          buttonSize="medium"
          onClick={() => {
            Accept();
          }}
        >
          수락하기
        </Button>
      </div>

      {refuse && (
        <Modal
          heading1={`${
            selectedStudentName.length > 1
              ? `${selectedStudentName[0]} 학생 외 ${
                  selectedStudentName.length - 1
                }명`
              : selectedStudentName.length === 1
              ? `${selectedStudentName[0]} 학생`
              : ""
          }`}
          heading2={`외출을 거절하시겠습니까?`}
          type="error"
          buttonMessage="거절"
          onCancel={closeModal}
          onConfirm={confirmReturn}
        />
      )}
      {accept && (
        <Modal
          heading1={`${
            selectedStudentName.length > 1
              ? `${selectedStudentName[0]} 학생 외 ${
                  selectedStudentName.length - 1
                }명`
              : selectedStudentName.length === 1
              ? `${selectedStudentName[0]} 학생`
              : ""
          }`}
          heading2={`외출을 수락하시겠습니까?`}
          type="button"
          buttonMessage="수락"
          onCancel={AcceptrCancel}
          onConfirm={Acceptconfirm}
        />
      )}
    </BackGround>
  );
};

export default OutAccept;
