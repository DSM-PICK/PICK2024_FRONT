"use client";
import Link from "next/link";
import Header from "../components/common/header/page";
import react, { useState } from "react";
import { getFullToday, getWeekDay } from "@/utils/date";
import Button from "../components/common/button/page";
import { Dropdown } from "../components/common/dropdown/page";
import DoubleTab from "../components/common/tab/page";
import { AfterCheck } from "../components/common/list/after/page";

const AfterManage = () => {
  const [edit, setEdit] = useState<boolean>(false);

  const onClickEdit = () => {
    setEdit(true);
  };

  const onClickSave = () => {
    setEdit(false);
  };

  const commonStyle = " bg-white text-label1 rounded-lg py-3 px-10";

  const threeStyle = " bg-white text-label1 rounded-lg py-3 px-25";

  const datalist = {
    name: [
      "1410 박현아",
      "1410 박수현",
      "1410 강해민",
      "1410 육기준",
      "1410 김도경",
      "1410 조영준",
    ],
    state: ["취업", "자퇴", "출석", "현체", "귀가", "출석"],
  };
  return (
    <div className=" h-dvh">
      <Header teacher="박현아" />
      <div className=" h-full flex flex-col px-100 py-12 gap-7">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; 학급 관리
        </div>
        <div className="flex justify-between">
          <div className="flex font-sans text-heading4 text-gray-900 gap-4 items-center">
            방과후 관리
            <div className="text-neutral-200 text-heading5">
              <DoubleTab
                firstChildren="전공동아리"
                secondChildren="방과후"
                onClick={() => {}}
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            {edit ? (
              <Button
                colorType="ghost"
                children="출결 저장하기"
                buttonSize="small"
                onClick={onClickSave}
              />
            ) : (
              <Button
                colorType="ghost"
                children="출결 체크하기"
                buttonSize="small"
                onClick={onClickEdit}
              />
            )}
            <Dropdown type="grade" />
            <Dropdown type="class" />
          </div>
        </div>
        <div className="w-full content-start rounded-xl bg-primary-1200 h-full px-10 py-10 overflow-y-scroll scrollbar-hide flex flex-wrap gap-x-16 gap-y-5">
          <div className=" flex gap-13">
            <div className=" flex gap-2 items-center">
              <div className=" text-heading5 text-primary-100">
                픽{/**api연결 */}
              </div>
              <div className=" text-sub-title2-M text-neutral-300">
                세미나실 2-1{/**api연결 */}
              </div>
            </div>
            {getWeekDay() === "금" ? (
              <div className="flex gap-11">
                <div className={commonStyle}>6교시</div>
                <div className={commonStyle}>7교시</div>
                <div className={commonStyle}>8교시</div>
                <div className={commonStyle}>9교시</div>
                <div className={commonStyle}>10교시</div>
              </div>
            ) : (
              <div className="flex gap-11">
                <div className={threeStyle}>8교시</div>
                <div className={threeStyle}>9교시</div>
                <div className={threeStyle}>10교시</div>
              </div>
            )}
          </div>
          <div className=" flex gap-13">
            <div className=" flex flex-col gap-6">
              {datalist.name.map((name, index) => (
                <div
                  className="flex bg-white py-4 px-6 rounded-lg text-label1"
                  key={index}
                >
                  {name}
                </div>
              ))}
            </div>
            <div className=" flex gap-11 w-155">
              <AfterCheck state="현체" day={3} />
              <AfterCheck state="무단" day={5} />
              <AfterCheck state="이동" day={3} />
              {/*이부분은 api연결하면서 할 예정 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterManage;
