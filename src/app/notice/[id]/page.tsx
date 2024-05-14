"use client";
import { NextPage } from "next";
import Header from "@/app/components/common/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DeleteNoticeData, DetailNoticeData } from "@/apis/notice";
import { useSearchParams } from "next/navigation";
import Button from "@/app/components/common/Button";
import { Grade } from "@/utils/until";

interface DetailNoticeType {
  title: string;
  content: string;
  create_at: string;
  teacher: string;
  grade: number[];
}

const DetailNotice: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useState<DetailNoticeType>();
  const param = useSearchParams();
  const idParam = param.get("id");

  const id = idParam ? idParam : "";

  const { data: DetailData } = DetailNoticeData(id);
  const { mutate: delelteMutate } = DeleteNoticeData();

  const modify = () => {
    router.push(`/notice/modify/query?id=${id}`);
  };

  useEffect(() => {
    if (DetailData) {
      setData(DetailData);
    }
  }, [DetailData]);

  const deleteNotice = async () => {
    try {
      const result = await delelteMutate(
        { id: id },
        {
          onSuccess: () => {
            router.back();
            alert("공지를 삭제하였습니다");
          },
          onError: () => {
            alert(`에러가 발생했습니다`);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-col gap-7 px-100 py-16 h-90%">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt;
          <Link href="/notice"> 공지 사항</Link> &gt; {data?.title}
        </div>
        <div className=" text-heading4 text-gray-900 flex justify-between">
          공지사항
          <div className=" flex items-center gap-3">
            <Button colorType="ghost" buttonSize="small" onClick={deleteNotice}>
              공지 삭제하기
            </Button>
            <Button colorType="primary" buttonSize="small" onClick={modify}>
              공지 수정하기
            </Button>
          </div>
        </div>
        <div className="w-auto gap-4 rounded-xl bg-primary-1200 h-full px-10 py-10">
          <div className="flex flex-col gap-4">
            <div className="flex gap-5 items-center">
              <div className=" flex text-primary-200 text-Button-L gap-2 ">
                작성 날짜
                <div className=" text-neutral-400">{data?.create_at}</div>
              </div>
              <div className=" flex text-primary-200 text-Button-L gap-2 ">
                작성자
                <div className=" text-neutral-400">{data?.teacher} 선생님</div>
              </div>
              <div className=" flex text-Button-L gap-2">
                학년
                <div className=" text-neutral-400">
                  {data?.grade.map((grade, index) => (
                    <span key={index}>{`${Grade([grade])}학년 `}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className=" flex flex-col gap-7">
              <div className=" text-heading5 text-neutral-100">
                {data?.title}
              </div>
              <div className=" whitespace-pre-line text-heading6-M text-neutral-100">
                {data?.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailNotice;
