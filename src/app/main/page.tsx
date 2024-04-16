"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Menu from "../components/common/menu/page";
import outList from "../../assets/img/Icon/외출자 목록.svg";
import outAccept from "../../assets/img/Icon/외출이동수락.svg";
import classChange from "../../assets/img/Icon/교실이동.svg";
import WeekendMeals from "../../assets/img/Icon/주말급식.svg";
import classManage from "../../assets/img/Icon/학급관리.svg";
import afterManage from "../../assets/img/Icon/방과후관리.svg";
import notice from "../../assets/img/Icon/공지사항.svg";
import changeTeacher from "../../assets/img/Icon/자습감독선생님변경.svg";
import schedule from "../../assets/img/Icon/일정변경.svg";
import outStudent from "../../assets/img/외출 일러스트.svg";
import CheckPage from "../components/common/menu/check/page";
import apply from "../../assets/img/신청 일러스트.svg";
import SelfCheck from "@/assets/img/Icon/학생조회.svg";
import changeStudent from "../../assets/img/교실 일러스트.svg";
import { getFullToday, getWeekDay } from "@/utils/date";
import { GetStudentNum, Test } from "@/apis/main";
import { GetTeacherName } from "@/apis/login/login";
import { useRouter } from "next/navigation";
import { TodaySelfStudy } from "@/apis/type";

interface Type {
  out: number;
  request: number;
  class_move: number;
}

const Main = () => {
  const today = new Date();
  const [selfStudy, setSelfStudy] = useState<TodaySelfStudy[]>([]);
  const [data, setData] = useState<Type>();
  const [teacherName, setTeacherName] = useState<string | null>(null);
  const router = useRouter();
  const { data: CountNum } = GetStudentNum();
  const { data: getName } = GetTeacherName();
  const { data: selfStudyData } = Test(getFullToday());

  useEffect(() => {
    if (selfStudyData) {
      setSelfStudy(selfStudyData);
    }
  }, [selfStudyData]);

  useEffect(() => {
    if (CountNum) {
      setData(CountNum);
    }
  }, [CountNum]);

  useEffect(() => {
    if (getName) {
      const teachername = getName.name;
      localStorage.setItem("name", teachername);
    }
  }, [getName]);

  useEffect(() => {
    const name = localStorage.getItem("name");
    setTeacherName(name);
  }, []);

  if (teacherName === "영양사") {
    router.push(`/WeekendMeals/all`);
  } else if (teacherName === "지킴이") {
    router.push(`/outList`);
  }

  return (
    <div className="w-full h-full">
      <Header />
      <div className="bg-primary-1200  3xl:px-100 mxl:px-72 py-20 px-44 min-w-max flex flex-col gap-8">
        <div className=" flex flex-col gap-5">
          <div className=" font-sans text-heading5 text-neutral-300">
            {today.getMonth() + 1}월 {today.getDate()}일 {getWeekDay()}요일
          </div>
        </div>
        <div className=" flex flex-col gap-16">
          <div className=" flex flex-col gap-4">
            <div className=" text-heading6-M">메뉴</div>
            <div className=" flex justify-between">
              <Menu href="/outList" icon={outList}>
                외출자 목록
              </Menu>
              <Menu href="/outAccept" icon={outAccept}>
                외출 수락
              </Menu>
              <Menu href="/classChange" icon={classChange}>
                교실이동
              </Menu>
              <Menu href="/WeekendMeals" icon={WeekendMeals}>
                주말급식
              </Menu>
              <Menu href="/classManage" icon={classManage}>
                학급 관리
              </Menu>
              <Menu href="/selfStudyCheck" icon={SelfCheck}>
                출석 체크
              </Menu>
              <Menu href="/afterManage" icon={afterManage}>
                방과후 관리
              </Menu>
              <Menu href="/changeTeacher" icon={changeTeacher}>
                감독 변경
              </Menu>
              <Menu href="/Schedule" icon={schedule}>
                일정변경
              </Menu>
              <Menu href="/notice" icon={notice}>
                공지 사항
              </Menu>
            </div>
          </div>
          <div className=" flex flex-col gap-3">
            <div className=" font-sans text-heading6-M">
              오늘의 자습 감독 선생님
            </div>
            <div className=" flex justify-between bg-white w-auto  px-23 py-8 rounded-lg rounded-tr-max text-heading6-M text-neutral-100">
              {selfStudy.map((item, index) => (
                <div key={index}>
                  <b>{item.floor}층</b> {item.teacher_name}선생님
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between ">
            <div className=" bg-white rounded-tl-max rounded-lg">
              <CheckPage
                href="outList"
                img={outStudent}
                number={data?.out}
                buttonChildren="외출 중인 학생 보기"
                color="primary"
                contentChildren="현재 외출중인 "
              />
            </div>
            <div className=" bg-white rounded-tr-max rounded-lg">
              <CheckPage
                href="outAccept"
                img={apply}
                number={data?.request}
                buttonChildren="외출 수락하러 가기"
                color="secondary"
                contentChildren="현재 외출/조기 귀가 신청 "
              />
            </div>
            <div className=" bg-white rounded-br-max rounded-lg">
              <CheckPage
                href="classChange"
                img={changeStudent}
                number={data?.class_move}
                buttonChildren="교실 이동 학생 목록 보기"
                color="tertiary"
                contentChildren="현재 교실 이동한 "
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-neutral-700 h-96"></div>
    </div>
  );
};

export default Main;
