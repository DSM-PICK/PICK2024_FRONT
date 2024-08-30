"use client";
import React from "react";
import Button from "@/app/components/common/Button";
import Allmeals from "@/app/components/common/list/Allmeals/page";
import TopBack from "@/app/components/common/background/top";
import { GetAllStudentMeal, Printexcel } from "@/apis/weekendMeal";
import { setStudentNum } from "@/utils/until";
import { useRouter } from "next/navigation";

interface StudentStatus {
  id: string;
  name: string;
  status: "OK" | "NO" | "QUIET";
  grade: number;
  class_num: number;
  num: number;
}

const AllWeekendMeal = () => {
  const router = useRouter();
  const { data: studentData } = GetAllStudentMeal();
  const { downloadExcel } = Printexcel();

  return (
    <TopBack
      subTitle="주말 급식 신청 현황"
      linkChildren="주말 급식 신청 현황 > 전체 학생"
      DropChildren={
        <>
          <Button colorType="ghost" onClick={downloadExcel} buttonSize="small">
            전체 엑셀 출력하기
          </Button>
          <Button
            colorType="primary"
            onClick={() => {
              router.back();
            }}
            buttonSize="small"
          >
            반별로 보기
          </Button>
        </>
      }
    >
      <div className="flex w-full pr-44 justify-between pl-30">
        <div className="flex gap-36">
          <div>학번</div>
          <div>이름</div>
        </div>
        <div>신청 상태</div>
      </div>
      <div className="w-full h-140 flex flex-col gap-4 overflow-y-scroll scrollbar-hide">
        {studentData?.map((item: StudentStatus, index: number) => (
          <Allmeals
            key={index}
            state={item.status}
            name={item.name}
            number={setStudentNum(item)}
          />
        ))}
      </div>
    </TopBack>
  );
};

export default AllWeekendMeal;
