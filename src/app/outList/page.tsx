"use client";
import React from "react";
import Header from "../components/common/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DoubleTab from "../components/common/tab/page";
import Button from "../components/common/Button";
import { getFullToday } from "@/utils/date";
import ReturnHome from "../components/common/list/returnHome/page";
import Out from "../components/common/list/out/page";
import { useState, useEffect } from "react";
import { OutListProp, ReturnHomeList } from "@/apis/outList/list";

interface earlyreturnOK {
  id: string;
  username: string;
  start_time: string;
  grade: number;
  classNum: number;
  num: number;
}

interface applicationOK {
  id: string;
  username: string;
  start_time: string;
  end_time: string;
  grade: number;
  classNum: number;
  num: number;
}

const OutList = () => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const [applicationList, setApplicationList] = useState<applicationOK[]>([]);
  const [earlyreturnlist, setEarlyreturnList] = useState<earlyreturnOK[]>([]);
  const router = useRouter();

  const { mutate: outListMutate } = OutListProp();
  const { mutate: homeMutate } = ReturnHomeList();

  const onClickTab = (tab: boolean) => {
    setSelectedTab(tab);
    selectedTab ? getHomeList() : getOutlist();
  };

  const reason = () => {
    router.push(`/outList/reason`);
  };

  const getHomeList = async () => {
    try {
      await homeMutate(null, {
        onSuccess: (data) => {
          setEarlyreturnList(data);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getOutlist = async () => {
    try {
      const result = await outListMutate(null, {
        onSuccess: (data) => {
          setApplicationList(data);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOutlist();
  }, []);

  return (
    <div className="h-dvh min-w-fit">
      <Header />
      <div className="flex flex-col gap-7 min-w-max mxl:px-100 px-64 py-16 h-90%">
        <div className=" text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; 외출자 목록
        </div>
        <div className="flex justify-between">
          <div className="flex font-sans  mxl:text-heading4 text-heading6-M text-gray-900 gap-4 items-center">
            외출자 목록
            <div className="text-neutral-200 mxl:text-heading5 text-heading6-M">
              {getFullToday()}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <DoubleTab
              firstChildren="외출"
              secondChildren="조기귀가"
              onClick={onClickTab}
            />
            <Button colorType="ghost" buttonSize="small" onClick={reason}>
              사유보기
            </Button>
          </div>
        </div>
        <div className="w-auto rounded-xl bg-primary-1200 h-full px-10 py-10">
          {selectedTab ? (
            <div className="flex flex-wrap gap-5 justify-between">
              {applicationList?.map((data, index) => (
                <Out
                  id={data.id}
                  key={index}
                  returnTime={data.end_time}
                  student={data.username}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-5 justify-between">
              {earlyreturnlist?.map((data, index) => (
                <ReturnHome key={index} student={data.username} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutList;
