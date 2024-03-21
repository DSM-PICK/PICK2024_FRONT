"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Dropdown from "@/app/components/common/dropdown";
import Header from "@/app/components/common/Header";
import Classmeals from "../components/common/list/classmeal/page";
import { MealCheck, NotMealCheck } from "@/apis/outList/list";
import { setStudentNum } from "@/utils/until";
import Button from "../components/common/Button";
import { Printexcel } from "@/apis/weekendMeal";

interface classmealProps {
  grade: string;
  classNumber: string;
}

interface mealcheckProp {
  id: string;
  name: string;
  status: "OK" | "NO";
  grade: number;
  class_num: number;
  num: number;
}

interface notCheckMeal {
  id: string;
  name: string;
  status: "QUIET";
  grade: number;
  class_num: number;
  num: number;
}

const WeekendMeals: React.FC<classmealProps> = ({ grade, classNumber }) => {
  const [checkMeal, setCheckMeal] = useState<mealcheckProp[]>([]);
  const [notCheckMeal, setNotCheckMeal] = useState<notCheckMeal[]>([]);
  const [selectGrade, setSelectGrade] = useState<number>(1);
  const [selectClass, setSelectClass] = useState<number>(1);

  const { downloadExcel } = Printexcel();

  const { mutate: checkMealMutate } = MealCheck();
  const { mutate: notCheckMealMutate } = NotMealCheck();

  useEffect(() => {
    checkMealList();
    notCheckMealList();
  }, [selectGrade, selectClass]);

  const handleGradeChange = (selectedOption: number) => {
    setSelectGrade(selectedOption);
  };

  const handleClassChange = (selectedOption: number) => {
    setSelectClass(selectedOption);
  };

  const checkMealList = async () => {
    try {
      await checkMealMutate(
        { grade: selectGrade, classNum: selectClass },
        {
          onSuccess: (data) => {
            setCheckMeal(data);
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const notCheckMealList = async () => {
    try {
      await notCheckMealMutate(
        {
          grade: selectGrade,
          classNum: selectClass,
        },
        {
          onSuccess: (data) => {
            setNotCheckMeal(data);
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-dvh flex flex-col">
      <Header />
      <div className=" self-center flex flex-col gap-7 w-3/5 py-16 h-90dvh">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt;
          <Link href="/WeekendMeals"> 주말 급식 신청 현황</Link> &gt;
          {`${selectGrade}학년 ${selectClass}반`}
        </div>
        <div className="flex justify-between">
          <div className="flex font-sans text-heading4 text-gray-900 gap-4 items-center">
            주말 급식
          </div>
          <div className="flex items-center gap-5">
            <Button
              colorType="ghost"
              buttonSize="small"
              onClick={downloadExcel}
            >
              엑셀로 출력하기
            </Button>
            <Dropdown type="grade" onChange={handleGradeChange} />
            <Dropdown type="class" onChange={handleClassChange} />
          </div>
        </div>
        <div className="w-auto h-140 flex py-8 pl-8 bg-primary-1200 rounded-xl gap-28 justify-evenly">
          <div className=" flex flex-col gap-9 w-1/2">
            <div className=" flex flex-col gap-1">
              <div className=" text-heading6-M text-gray-900">응답자</div>
              <div className=" text-caption1 text-neutral-300">
                응답자의 상태는 수정할 수 없습니다.
              </div>
            </div>
            <div className=" overflow-scroll scrollbar-hide flex flex-col gap-3">
              {checkMeal?.map((item, index) => (
                <Classmeals
                  key={index}
                  number={setStudentNum(item)}
                  name={item.name}
                  state={item.status || "NO"}
                />
              ))}
            </div>
          </div>
          <div className=" flex flex-col gap-9 w-1/2">
            <div className=" flex flex-col gap-1">
              <div className=" text-heading6-M text-gray-900">미응답자</div>
              <div className=" text-caption1 text-neutral-300">
                매달 5일 전까지 상태를 수정할 수 있습니다
              </div>
            </div>
            <div className=" overflow-scroll scrollbar-hide flex flex-col gap-3 h-full">
              {notCheckMeal?.map((item, index) => (
                <Classmeals
                  id={item.id}
                  key={index}
                  number={setStudentNum(item)}
                  name={item.name}
                  state={item.status || "QUIET"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekendMeals;
