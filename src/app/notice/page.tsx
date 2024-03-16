"use client";
import Link from "next/link";
import Header from "../components/common/Header";
import { getFullToday } from "@/utils/date";
import Button from "../components/common/Button";
import NoticeList from "../components/common/list/notice/page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getNoticeList } from "@/apis/notice";

interface GetnoticeList {
  id: string;
  title: string;
  create_at: string;
}

const Notice = () => {
  const router = useRouter();
  const writeNotice = () => {
    router.push("/notice/write");
  };

  const [data, setData] = useState<GetnoticeList[]>();

  const { mutate: NoticeMutate } = getNoticeList();

  const getNotice = async () => {
    try {
      await NoticeMutate(null, {
        onSuccess: (data) => {
          setData(data);
        },
        onError: (error) => {
          alert(`${error.name} : 데이터를 갖고오는데 실패하였습니다`);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotice();
  }, []);

  return (
    <div className="h-dvh min-w-fit">
      <Header />
      <div className="flex flex-col gap-7 min-w-max mxl:px-100 px-64 py-16 h-90%">
        <div className=" text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; 공지 사항
        </div>
        <div className="flex justify-between">
          <div className="flex font-sans  mxl:text-heading4 text-heading6-M text-gray-900 gap-4 items-center">
            공지 사항
            <div className="text-neutral-200 mxl:text-heading5 text-heading6-M">
              {getFullToday()}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <Button
              colorType="primary"
              buttonSize="small"
              onClick={writeNotice}
            >
              공지 작성하기
            </Button>
          </div>
        </div>
        <div className=" flex text-sub-title2-M px-14 justify-between">
          <div className=" text-sub-title2-M">제목</div>
          <div className=" flex gap-20">
            <div>학년</div>
            <div>작성자</div>
            <div>작성일</div>
          </div>
        </div>
        {data?.map((item, index) => (
          <NoticeList
            key={index}
            title={item.title}
            id={item.id}
            createAt={item.create_at}
            teacher="ddd 선생님"
            grade="전학년"
          />
        ))}
      </div>
    </div>
  );
};

export default Notice;
