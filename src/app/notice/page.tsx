"use client";
import { getFullToday } from "@/utils/date";
import Button from "../components/common/Button";
import NoticeList from "../components/common/list/notice/page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetNoticeList } from "@/apis/notice";
import { Grade } from "@/utils/until";
import TopBack from "../components/common/background/top";

interface GetnoticeList {
  id: string;
  title: string;
  create_at: string;
  teacher: string;
  grade: number[];
}

const Notice = () => {
  const router = useRouter();
  const writeNotice = () => {
    router.push("/notice/write");
  };

  const [data, setData] = useState<GetnoticeList[]>();
  const { data: Notice } = GetNoticeList();

  useEffect(() => {
    if (Notice) {
      setData(Notice);
    }
  }, [Notice]);

  return (
    <>
      <TopBack
        linkChildren="공지 사항"
        subTitle="공지 사항"
        DropChildren={
          <Button colorType="primary" buttonSize="small" onClick={writeNotice}>
            공지 작성하기
          </Button>
        }
        secondTitle={getFullToday()}
      >
        <div className=" flex text-sub-title2-M px-14 justify-between">
          <div className=" text-sub-title2-M">제목</div>
          <div className=" flex gap-20">
            <div>학년</div>
            <div>작성자</div>
            <div>작성일</div>
          </div>
        </div>
        <div className=" flex flex-col gap-3">
          {data?.map((item, index) => (
            <NoticeList
              key={index}
              title={item.title}
              id={item.id}
              createAt={item.create_at}
              teacher={`${item.teacher} 선생님`}
              grade={`${Grade(item.grade)}학년`}
            />
          ))}
        </div>
      </TopBack>
    </>
  );
};

export default Notice;
