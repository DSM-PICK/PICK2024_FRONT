"use client";
import { NextPage } from "next";
import Header from "../../../Header";
import Link from "next/link";

const DetailNotice: NextPage = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-col gap-7 px-100 py-16 h-90%">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt;
          <Link href="/outList">공지 사항</Link> &gt; {"아하.."}
        </div>
        <div className=" text-heading4 text-gray-900">공지사항</div>
        <div className="w-auto gap-4 rounded-xl bg-primary-1200 h-full px-10 py-10">
          <div className="flex items-end flex-col gap-4">
            <div className="flex">
              <div className={`$w-44 h-15`}>날짜</div>
              <div className={`w-54 h-15`}>시간</div>
              <div className={`w-120 h-15`}>사유</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailNotice;
