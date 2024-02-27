"use client";
import Header from "@/app/components/common/header/page";
import { PreviousList } from "@/app/components/common/list/previous/page";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { previous } from "@/apis/outList/list";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";

interface PreviousData {
  reason: string;
  start_time: string;
  end_time: string;
  username: string;
  date: string;
  type: "APPLICATION" | "EARLY_RETURN";
}

const Previous: NextPage = () => {
  const params = useSearchParams();
  const { mutate: preList } = previous();
  const [preData, setPreData] = useState<PreviousData[]>([]);
  const nameParams = params.get("name");
  const student = nameParams ? nameParams : "";
  const preOut = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      const result = await preList(
        {
          name: student,
        },
        {
          onSuccess: (data) => {
            setPreData(data);
          },
          onError: (error) => {
            console.error("에러발생", error);
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const Time = (data: PreviousData) => {
    if (data.end_time === null) return `${data.start_time.slice(0, 5)}`;
    return `${data.start_time.slice(0, 5)} ~ ${data.end_time.slice(0, 5)}`;
  };

  useEffect(() => {
    preOut();
  }, []);

  const listcommon =
    "flex justify-center items-center text-sub-title1-M text-neutral-50";

  return (
    <div className="flex flex-col">
      <Header teacher="dd" />
      <div className="flex flex-col gap-7 px-100 py-16 h-90%">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt;
          <Link href="/outList">외출자 목록</Link> &gt; {student}의 이전 외출
        </div>
        <div className="font-sans text-heading4 text-gray-900">
          {student}의 이전 외출
        </div>
        <div className="w-auto gap-4 rounded-xl bg-primary-1200 h-full px-10 py-10">
          <div className="flex items-end flex-col gap-4">
            <div className="flex">
              <div className={`${listcommon} w-44 h-15`}>날짜</div>
              <div className={`${listcommon} w-54 h-15`}>시간</div>
              <div className={`${listcommon} w-120 h-15`}>사유</div>
            </div>
            {preData.map((data, index) => (
              <PreviousList
                key={index}
                type={data.type}
                date={data.date}
                time={Time(data)}
                why={data.reason}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Previous;
