"use client";
import ReasonList from "@/app/components/common/list/reason/page";
import DoubleTab from "@/app/components/common/tab/page";
import { getFullToday } from "@/utils/date";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AlloutList, ReturnHome } from "@/apis/outList/list";
import { getStudentString } from "@/utils/until";
import { BackGround } from "@/app/components/common/background";

interface OutListData {
  id: string;
  user_id: string;
  user_name: string;
  start: string;
  end: string;
  grade: number;
  class_num: number;
  num: number;
  reason: string;
}

interface HomeData {
  id: string;
  user_id: string;
  user_name: string;
  start: string;
  grade: number;
  class_num: number;
  num: number;
  reason: string;
}

const Reason = () => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const [outData, setOutData] = useState<OutListData[]>([]);
  const [returnHomeData, setReturnHomeData] = useState<HomeData[]>([]);

  const { data: outListData } = AlloutList();
  const { data: returnHomeListData } = ReturnHome();

  useEffect(() => {
    if (outListData) {
      setOutData(outListData);
    }
  }, [outListData]);

  useEffect(() => {
    if (returnHomeListData) {
      setReturnHomeData(returnHomeListData);
    }
  }, [returnHomeListData]);

  const onClickTab = (tab: boolean) => {
    setSelectedTab(tab);
  };

  const student = (item: any) => getStudentString(item);

  return (
    <BackGround
      linkChildren={
        <>
          <Link href={"/outList"}>외출자 목록 </Link>
          &gt; {selectedTab ? "외출자 사유" : "조기 귀가 사유"}
        </>
      }
      subTitle={selectedTab ? "외출자 사유" : " 조기 귀가 사유"}
      secondTitle={getFullToday()}
      DropChildren={
        <DoubleTab
          firstChildren="외출"
          secondChildren="조기귀가"
          onClick={onClickTab}
        />
      }
    >
      <div className="flex flex-wrap gap-5 justify-between">
        {(selectedTab ? outData : returnHomeData).map((item, index) => (
          <ReasonList
            key={index}
            time={item.start}
            endTime=""
            student={student(item)}
            why={item.reason}
          />
        ))}
      </div>
    </BackGround>
  );
};

export default Reason;
