"use client";
import Header from "../components/common/header/page";
import React from "react";
import Menu from "../components/common/menu/page";
import outList from "../../assets/img/Icon/외출자 목록.svg";
import outAccept from "../../assets/img/Icon/외출이동수락.svg";
import classChange from "../../assets/img/Icon/교실이동.svg";
import WeekendMeals from "../../assets/img/Icon/주말급식.svg";
import classManage from "../../assets/img/Icon/학급관리.svg";
import afterManage from "../../assets/img/Icon/방과후관리.svg";
import studentInquiry from "../../assets/img/Icon/학생조회.svg";
import changeTeacher from "../../assets/img/Icon/자습감독선생님변경.svg";
import notice from "../../assets/img/Icon/공지사항.svg";
import outStudent from "../../assets/img/외출 일러스트.png";
import CheckPage from "../components/common/menu/check/page";
import apply from "../../assets/img/신청 일러스트.png";
import changeStudent from "../../assets/img/교실 일러스트.png";

const Main = () => {
  const teacher = "";
  const today = new Date();
  const Nightcheck = `${1}층 자습감독`;
  //api연동하면서 추가 할 예정
  const onClickF = () => {
    console.log("클릭");
  };

  return (
    <div className="bg-primary-1200 h-full">
      <Header teacher="박현아" />
      <div className="px-100 py-20 flex flex-col gap-17">
        <div className=" flex flex-col gap-5">
          <div className=" font-sans text-heading5 text-neutral-300">
            {today.getMonth() + 1}월 {today.getDate()}일 {getWeekDay()}요일
          </div>
          <div className=" gap-3 text-neutral-50 flex text-heading4">
            {teacher} 선생님은
            <div className=" text-primary-500 flex"> {Nightcheck}</div>입니다.
          </div>
        </div>
        <div className=" flex flex-col gap-4">
          <div className=" text-heading6-M">메뉴</div>
          <div className=" flex gap-2">
            <Menu children="외출자 목록" href="/outList" icon={outList} />
            <Menu children="외출 수락" href="/outAccept" icon={outAccept} />
            <Menu children="교실 이동" href="/classChange" icon={classChange} />
            <Menu
              children="주말급식"
              href="/WeekendMeals"
              icon={WeekendMeals}
            />
            <Menu children="학급 관리" href="/classManage" icon={classManage} />
            <Menu
              children="방과후 관리"
              href="/afterManage"
              icon={afterManage}
            />
            <Menu
              children="학생 조회"
              href="/studentInquiry"
              icon={studentInquiry}
            />
            <Menu
              children="자습감독선생님 변경"
              href="/changeTeacher"
              icon={changeTeacher}
            />
            <Menu children="공지 사항" href="/notice" icon={notice} />
          </div>
        </div>
        <div className=" flex flex-col gap-3">
          <div className=" font-sans text-heading6-M">
            오늘의 자습 감독 선생님
          </div>
          <div className=" flex justify-between bg-white w-auto px-23 py-8 rounded-lg rounded-tr-max text-neutral-100">
            <div>2층 {/*나중에 api연결시 추가 */} 선생님</div>{" "}
            <div>3층 {/*나중에 api연결시 추가 */} 선생님</div>
            <div>4층 {/*나중에 api연결시 추가 */} 선생님</div>
          </div>
        </div>
        <div className="flex gap-6">
          <div className=" bg-white rounded-tl-max rounded-lg">
            <CheckPage
              img={outStudent}
              buttonChildren="외출 수락하러 가기"
              onClick={onClickF}
              color="primary"
              contentChildren="현재 외출중인 "
            />
          </div>
          <div className=" bg-white rounded-tr-max rounded-lg">
            <CheckPage
              img={apply}
              buttonChildren="출결 상태 확인하기"
              onClick={onClickF}
              color="secondary"
              contentChildren="현재 외출/조기 귀가 신청 "
            />
          </div>
          <div className=" bg-white rounded-br-max rounded-lg">
            <CheckPage
              img={changeStudent}
              buttonChildren="외출 수락하러 가기"
              onClick={onClickF}
              color="tertiary"
              contentChildren="현재 교실 이동한 "
            />
          </div>
        </div>
      </div>
      <div className=" bg-neutral-700 h-96"></div>
    </div>
  );
};

export default Main;