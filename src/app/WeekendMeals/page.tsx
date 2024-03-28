"use client";
import React, { useEffect, useState } from "react";
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
  const [data, setData] = useState<StudentStatus[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetAllStudentMeal();
        if (Array.isArray(result)) {
          setData(result);
        }
      } catch (error) {
        alert(`에러 발생`);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const { downloadExcel } = Printexcel();

  return (
    <TopBack
      subTitle={`주말 급식 신청 현황`}
      linkChildren="주말 급식 신청 현황"
      DropChildren={
        <>
          <Button colorType="ghost" onClick={downloadExcel} buttonSize="small">
            엑셀로 출력하기
          </Button>
          <Button
            colorType="primary"
            onClick={() => {
              router.push("/WeekendMeals/class");
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
      <div className=" w-full h-140 flex flex-col gap-4 overflow-y-scroll scrollbar-hide">
        {data?.map((item, index) => (
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
