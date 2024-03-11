"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Link from "next/link";
import DoubleTab from "../components/common/tab/page";
import { Button } from "../components/common";
import { getFullToday } from "@/utils/date";
import { AcceptList } from "../components/common/list/accept/page";
import Dropdown from "../components/common/dropdown";
import Modal from "../components/common/modal/page";
import { getClass, outAccept } from "@/apis/outAccept/outAccept";
import { getStudentString, setStudentNum } from "@/utils/until";

interface applicationDataProp {
  class_num: number;
  end_time: string;
  grade: number;
  id: string;
  num: number;
  reason: string;
  start_time: string;
  user_id: string;
  username: string;
}

const OutAccept = () => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const [refuse, setRefuse] = useState<boolean>(false);
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const [outSelectedGrade, setOutSelectedGrade] = useState<number>();
  const [outSelectedClass, setOutSelectedClass] = useState<number>();
  const [accept, setAccept] = useState<boolean>(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedStudentName, setSelectedStudentName] = useState<string[]>([]);
  const [data, setData] = useState<applicationDataProp[]>([]);

  const { mutate: outAcceptMutate } = outAccept();
  const { mutate: getClassMutate } = getClass();

  const onClickTab = (tab: boolean) => {
    setSelectedTab(tab);

    if (tab) {
      handleGradeChange(1);
      handleClassChange(1);
    } else {
      handleGradeChange(1);
      handleClassChange(1);
    }
  };

  useEffect(() => {
    AcceptDataList();
  }, [outSelectedClass, outSelectedGrade]);

  useEffect(() => {
    AcceptDataList();
  }, [selectedGrade, selectedClass]);

  const handleGradeChange = (selectedOption: number) => {
    setSelectedGrade(selectedOption);
  };

  const handleClassChange = (selectedOption: number) => {
    setSelectedClass(selectedOption);
  };

  const AcceptDataList = async () => {
    try {
      if (selectedGrade && selectedClass) {
        const reqOption = selectedTab ? "application" : "early-return";
        const response = await getClassMutate(
          {
            type: reqOption,
            grade: selectedGrade,
            class: selectedClass,
          },
          {
            onSuccess: (data) => {
              setData(data);
              console.log(data);
            },
            onError: (error) => {
              console.log(error);
            },
          }
        );
      }
    } catch (error) {
      console.error("Out accept error", error);
    }
  };

  const Accept = async () => {
    setAccept(true);
  };

  const Refuse = () => {
    setRefuse(true);
  };

  const Acceptconfirm = async () => {
    try {
      if (selectedGrade && selectedClass) {
        const reqOption = selectedTab ? "application" : "early-return";
        await outAcceptMutate(
          {
            type: reqOption,
            status: "OK",
            ids: selectedStudents,
          },
          {
            onSuccess: (response) => {
              setData(data);
              console.log("Out accept success", response);
              setAccept(false);
            },
            onError: (error) => {
              console.error("Out accept error", error);
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

  const confirmReturn = async () => {
    try {
      if (selectedGrade && selectedClass) {
        const reqOption = selectedTab ? "application" : "early-return";
        await outAcceptMutate(
          {
            type: reqOption,
            status: "NO",
            ids: selectedStudents,
          },
          {
            onSuccess: (response) => {
              setData(data);
              console.log("Out accept success", response);
              setRefuse(false);
            },
            onError: (error) => {
              console.error("Out accept error", error);
              setRefuse(false);
            },
          }
        );
      }
    } catch (error) {
      alert("외출 수락에 실패하였습니다");
      setRefuse(false);
    }
  };

  const closeModal = () => {
    setRefuse(false);
  };

  const AcceptrCancel = () => {
    setAccept(false);
  };

  const handleAcceptListClick = (id: string, name: string) => {
    const isStudentSelected = selectedStudents.includes(id);
    const nameList = selectedStudentName.includes(name);

    if (isStudentSelected) {
      setSelectedStudents((prevSelectedStudents) =>
        prevSelectedStudents.filter((selectedStudent) => selectedStudent !== id)
      );
      setSelectedStudentName((prevSelectedStudentName) =>
        prevSelectedStudentName.filter(
          (selectedStudentName) => selectedStudentName !== name
        )
      );
    } else {
      setSelectedStudents((prevSelectedStudents) => [
        ...prevSelectedStudents,
        id,
      ]);
      setSelectedStudentName((prevSelectedStudentName) => [
        ...prevSelectedStudentName,
        name,
      ]);
    }
  };

  return (
    <div className="h-dvh">
      <Header />
      <div className="flex flex-col gap-7 px-100 py-16 h-90%">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; 외출 수락
        </div>
        <div className="flex justify-between">
          <div className="flex font-sans text-heading4 text-gray-900 gap-4 items-center">
            외출 수락
            <div className="text-neutral-200 text-heading5">
              {getFullToday()}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <DoubleTab
              firstChildren="외출"
              secondChildren="조기귀가"
              onClick={onClickTab}
            />
            {selectedTab ? (
              <>
                <Dropdown type="grade" onChange={handleGradeChange} />
                <Dropdown type="class" onChange={handleClassChange} />
              </>
            ) : (
              <>
                <Dropdown type="grade" onChange={handleGradeChange} />
                <Dropdown type="class" onChange={handleClassChange} />
              </>
            )}
          </div>
        </div>
        <div className="w-auto rounded-xl bg-primary-1200 h-full px-10 py-10 flex flex-col justify-between items-start">
          <div>
            {selectedTab ? (
              <div className="flex flex-wrap gap-5 justify-between">
                {data.map((dataItem, index) => (
                  <AcceptList
                    onClick={() =>
                      handleAcceptListClick(dataItem.id, dataItem.username)
                    }
                    key={index}
                    time={`${dataItem.start_time}`}
                    student={getStudentString(dataItem)}
                    why={`${dataItem.reason}`}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-5 justify-between">
                {data.map((dataItem, index) => (
                  <AcceptList
                    onClick={() =>
                      handleAcceptListClick(dataItem.id, dataItem.username)
                    }
                    key={index}
                    time={dataItem.start_time}
                    student={`${getStudentString(dataItem)}`}
                    why={dataItem.reason}
                  />
                ))}
              </div>
            )}
          </div>
          <div className=" flex gap-5 w-full justify-end">
            <Button
              colorType="ghost"
              children="거절하기"
              buttonSize="medium"
              onClick={() => {
                Refuse();
              }}
            />
            <Button
              colorType="primary"
              children="수락하기"
              buttonSize="medium"
              onClick={() => {
                Accept();
              }}
            />
          </div>
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
      </div>
    </div>
  );
};

export default OutAccept;
