"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "@/app/components/common/dropdown";
import Classmeals from "../components/common/list/classmeal/page";
import {
  ChangeState,
  MealCheck,
  useClassWeekendMealExcel,
} from "@/apis/weekendMeal";
import { setStudentNum } from "@/utils/until";
import Button from "../components/common/Button";
import { BackGround } from "../components/common/background";
import { useRouter } from "next/navigation";
import { NextPage } from "next";

const WeekendMeals: NextPage = () => {
  const router = useRouter();
  const [selectGrade, setSelectGrade] = useState<number>(1);
  const [selectClass, setSelectClass] = useState<number>(1);

  const { usedownloadClassExcel } = useClassWeekendMealExcel();

  const AllMeals = () => {
    router.push("/WeekendMeals/all");
  };

  const { data: checkMealMutate, refetch: ReCheckMealMutate } = MealCheck(
    selectGrade,
    selectClass
  );
  const { mutate: ChangeMealMutate } = ChangeState();

  const Change = async (selectedOption: "신청" | "미신청", id: string) => {
    const status = selectedOption === "미신청" ? "NO" : "OK";
    try {
      await ChangeMealMutate(
        { status, id },
        {
          onSuccess: () => {
            ReCheckMealMutate();
          },
          onError: (error) => {
            alert(`${error.message} : 에러가 발생하였습니다`);
          },
        }
      );
    } catch (error) {
      alert(`상태변경중 에러가 발생했습니다`);
      console.log(error);
    }
  };

  useEffect(() => {
    const grade = parseInt(localStorage.getItem("grade") || "1", 10);
    const class_num = parseInt(localStorage.getItem("class_num") || "1", 10);
    const setgrade = grade === 0 ? 1 : grade;
    const setclass_num = class_num === 0 ? 1 : class_num;
    setSelectGrade(setgrade);
    setSelectClass(setclass_num);
  }, []);

  const handleGradeChange = (selectedOption: number) => {
    setSelectGrade(selectedOption);
  };

  const handleClassChange = (selectedOption: number) => {
    setSelectClass(selectedOption);
  };

  return (
    <BackGround
      subTitle="주말 급식"
      secondTitle=""
      linkChildren={`주말 급식 신청 현황 > ${selectGrade}학년 ${selectClass}반`}
      DropChildren={
        <>
          <Button
            colorType="ghost"
            buttonSize="small"
            onClick={() => usedownloadClassExcel(selectGrade, selectClass)}
          >
            반별 엑셀 출력하기
          </Button>
          <Button colorType="primary" buttonSize="small" onClick={AllMeals}>
            전체 학생 보기
          </Button>
          <div className=" flex gap-5">
            <Dropdown
              type="grade"
              onChange={handleGradeChange}
              homeRoom={true}
            />
            <Dropdown
              type="class"
              onChange={handleClassChange}
              homeRoom={true}
            />
          </div>
        </>
      }
    >
      <div className=" flex justify-between w-full">
        <div className=" flex flex-col gap-9 w-1/2">
          <div className=" flex flex-col gap-1">
            <div className=" text-heading6-M text-gray-900">신청자</div>
          </div>
          <div className=" flex flex-col gap-3">
            {checkMealMutate?.map(
              (item, index) =>
                item.status === "OK" && (
                  <Classmeals
                    key={index}
                    number={setStudentNum(item)}
                    name={item.user_name}
                    state={item.status || "NO"}
                    onclick={(selectedOption) =>
                      Change(selectedOption, item.id)
                    }
                    id={item.id}
                  />
                )
            )}
          </div>
        </div>
        <div className=" flex flex-col gap-9 w-1/2 h-full">
          <div className=" flex flex-col gap-1">
            <div className=" text-heading6-M text-gray-900">미신청자</div>
          </div>
          <div className="flex flex-col gap-3 h-full">
            {checkMealMutate?.map(
              (item, index) =>
                item.status === "NO" && (
                  <Classmeals
                    key={index}
                    number={setStudentNum(item)}
                    name={item.user_name}
                    state={item.status || "NO"}
                    onclick={(selectedOption) =>
                      Change(selectedOption, item.id)
                    }
                    id={item.id}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </BackGround>
  );
};

export default WeekendMeals;
