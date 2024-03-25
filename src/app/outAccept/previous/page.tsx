"use client";
import { GetStudentData } from "@/apis/classManage";
import Header from "@/app/components/common/Header";
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
    <div className="h-dvh flex flex-col">
      <Header />
      <div className=" self-center flex flex-col gap-7 py-16 h-90dvh w-3/5">
        <div className="text-neutral-200 text-sub-title3-B text-nowrap">
          <Link href="/main">홈</Link> &gt;
          <Link href="/outAccept"> 외출 수락</Link> &gt; 외출 기록 보기
        </div>
        <div className=" flex justify-between items-center gap-3 flex-wrap">
          <div className=" text-nowrap flex justify-center items-center font-sans text-heading4 text-gray-900">
            외출 기록 보기
          </div>
          <div className=" flex items-center gap-3">
            <Dropdown type="grade" onChange={handleGradeChange} />
            <Dropdown type="class" onChange={handleClassChange} />
          </div>
        </div>
        <div className="w-auto content-start rounded-xl bg-primary-1200 h-140 px-10 py-10 overflow-y-scroll scrollbar-hide flex flex-wrap gap-x-16 gap-y-5">
          {data &&
            data.students.map((item, index) => (
              <PreviousList
                id={item.user_id}
                key={index}
                userName={`${setStudentNum(item)} ${item.name}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Previous;
