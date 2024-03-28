"use client";
import { GetStudentData } from "@/apis/classManage";
import Header from "@/app/components/common/Header";
import { BackGround } from "@/app/components/common/background";
import Dropdown from "@/app/components/common/dropdown";
import PreviousList from "@/app/components/common/list/before";
import { getStudentString, setStudentNum } from "@/utils/until";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const Previous = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const { mutate: getStudentDataMutate } = GetStudentData();
  const [data, setData] = useState<StudentData>();

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, [selectedGrade, selectedClass]);

  const handleGradeChange = (selectedOption: number) => {
    setSelectedGrade(selectedOption);
  };

  const handleClassChange = (selectedOption: number) => {
    setSelectedClass(selectedOption);
  };

  return (
    <BackGround
      secondTitle={`${selectedGrade}학년 ${selectedClass}반`}
      subTitle="외출 기록 보기"
      DropChildren={
        <>
          <Dropdown type="grade" onChange={handleGradeChange} />
          <Dropdown type="class" onChange={handleClassChange} />
        </>
      }
      linkChildren={
        <>
          <Link href="/outAccept"> 외출 수락</Link> &gt; 외출 기록 보기
        </>
      }
    >
      {data &&
        data.students.map((item, index) => (
          <PreviousList
            id={item.user_id}
            key={index}
            userName={`${setStudentNum(item)} ${item.name}`}
          />
        ))}
    </BackGround>
  );
};

export default Previous;
