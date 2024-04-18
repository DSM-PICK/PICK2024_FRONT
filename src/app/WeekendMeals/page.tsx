"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "@/app/components/common/dropdown";
import Classmeals from "../components/common/list/classmeal/page";
import { MealCheck, NotMealCheck } from "@/apis/weekendMeal";
import { setStudentNum } from "@/utils/until";
import Button from "../components/common/Button";
import { Printexcel } from "@/apis/weekendMeal";
import { BackGround } from "../components/common/background";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [checkMeal, setCheckMeal] = useState<mealcheckProp[]>([]);
  const [notCheckMeal, setNotCheckMeal] = useState<notCheckMeal[]>([]);
  const [selectGrade, setSelectGrade] = useState<number>(1);
  const [selectClass, setSelectClass] = useState<number>(1);
  const [effect, setEffect] = useState<number>(0);

  const { downloadExcel } = Printexcel();

  const AllMeals = () => {
    router.push("/WeekendMeals/all");
  };

  const { mutate: checkMealMutate } = MealCheck();
  const { mutate: notCheckMealMutate } = NotMealCheck();

  useEffect(() => {
    checkMealList();
    notCheckMealList();
  }, [selectGrade, selectClass]);

  useEffect(() => {
    const timer = setTimeout(() => {
      notCheckMealList();
      checkMealList();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [effect]);

  const handleGradeChange = (selectedOption: number) => {
    setSelectGrade(selectedOption);
  };

  const handleClassChange = (selectedOption: number) => {
    setSelectClass(selectedOption);
  };

  const checkMealList = async () => {
    try {
      await checkMealMutate(
        { grade: selectGrade, class_num: selectClass },
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
          class_num: selectClass,
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
    <BackGround
      subTitle="주말 급식"
      secondTitle=""
      linkChildren={`주말 급식 신청 현황 > ${selectGrade}학년 ${selectClass}반`}
      DropChildren={
        <>
          <Button colorType="ghost" buttonSize="small" onClick={downloadExcel}>
            엑셀로 출력하기
          </Button>
          <Button colorType="primary" buttonSize="small" onClick={AllMeals}>
            전체 학생 보기
          </Button>
          <div className=" flex gap-5">
            <Dropdown type="grade" onChange={handleGradeChange} />
            <Dropdown type="class" onChange={handleClassChange} />
          </div>
        </>
      }
    >
      <div className=" flex justify-between w-full">
        <div className=" flex flex-col gap-9 w-1/2">
          <div className=" flex flex-col gap-1">
            <div className=" text-heading6-M text-gray-900">응답자</div>
            <div className=" text-caption1 text-neutral-300">
              응답자의 상태는 수정할 수 없습니다.
            </div>
          </div>
          <div className=" flex flex-col gap-3">
            {checkMeal?.map((item, index) => (
              <Classmeals
                key={index}
                number={setStudentNum(item)}
                name={item.name}
                state={item.status || "NO"}
                onclick={() => {}}
              />
            ))}
          </div>
        </div>
        <div className=" flex flex-col gap-9 w-1/2 h-full">
          <div className=" flex flex-col gap-1">
            <div className=" text-heading6-M text-gray-900">미응답자</div>
            <div className=" text-caption1 text-neutral-300">
              매달 5일 전까지 상태를 수정할 수 있습니다
            </div>
          </div>
          <div className="flex flex-col gap-3 h-full">
            {notCheckMeal?.map((item, index) => (
              <Classmeals
                id={item.id}
                key={index}
                number={setStudentNum(item)}
                name={item.name}
                state={item.status || "QUIET"}
                onclick={() => {
                  setEffect(effect + 1);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </BackGround>
  );
};

export default WeekendMeals;
