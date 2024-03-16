"use client";
import Button from "@/app/components/common/Button";
import Header from "@/app/components/common/Header";
import SelectGrade from "@/app/components/common/dropdown/selectGrade";
import Input from "@/app/components/common/input";
import Link from "next/link";

interface PostNotice {}

const WriteNotice = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-7 min-w-max mxl:px-100 px-64 py-16 h-90%">
        <div className=" text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt;{" "}
          <Link href="/notice">공지 사항</Link> &gt; 공지사항 작성
        </div>
        <div className="flex justify-between">
          <div className="flex font-sans  mxl:text-heading4 text-heading6-M text-gray-900 gap-4 items-center">
            공지 사항
          </div>
        </div>
        <div className=" flex flex-col">
          <div className=" flex gap-5">
            <div className=" w-full">
              제목
              <Input type="text" onChange={() => {}} value="" width="full" />
            </div>
            <div>
              학년
              <SelectGrade />
            </div>
          </div>
          <div className=" flex flex-col w-full items-end gap-7">
            <div className=" flex flex-col w-full">
              내용
              <textarea
                placeholder="공지 내용 입력"
                className=" p-4 w-full h-80 resize-none bg-neutral-900 outline-neutral-800"
              ></textarea>
            </div>
            <Button colorType="primary" buttonSize="small" onClick={() => {}}>
              공지 업로드
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteNotice;
