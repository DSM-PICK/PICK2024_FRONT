"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface NoticeProp {
  title: string;
  teacher: string;
  createAt: string;
  grade: string;
  id: string;
}

const NoticeList: React.FC<NoticeProp> = ({
  title,
  teacher,
  createAt,
  grade,
  id,
}) => {
  const router = useRouter();

  const MoveDetail = () => {
    router.push(`/notice/query?id=${id}`);
  };

  return (
    <div
      className=" cursor-pointer flex px-14 bg-neutral-900 py-4 justify-between w-full gap-40"
      onClick={MoveDetail}
    >
      <div className=" max-w-96 overflow-hidden whitespace-nowrap text-overflow-ellipsis">
        {title}
      </div>
      <div className=" flex justify-between w-76">
        <div>{grade}</div>
        <div>{teacher}</div>
        <div>{createAt}</div>
      </div>
    </div>
  );
};

export default NoticeList;
