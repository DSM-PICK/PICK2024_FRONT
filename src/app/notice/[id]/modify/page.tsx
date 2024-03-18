"use client";
import { useState } from "react";
import Button from "@/app/components/common/Button";
import Header from "@/app/components/common/Header";
import Input from "@/app/components/common/input";
import Link from "next/link";
import SelectGrade from "@/app/components/common/dropdown/selectGrade";
import { useRouter } from "next/navigation";
import TextArea from "@/app/components/common/input/textarea";

interface ChangeProps {
  text: string;
  name: string;
}

const ModifyNotice = () => {
  const nav = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<number>(1);

  const handleTitleChange = ({ text, name }: ChangeProps) => {
    setTitle(text);
  };

  const handleContentChange = ({ text, name }: ChangeProps) => {
    setContent(text);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-7 min-w-max mxl:px-100 px-64 py-16 h-90%">
        <div className=" text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt;
          <Link href="/notice"> 공지 사항</Link> &gt; 공지수정 하기
        </div>
        <div className="flex justify-between">
          <div className="flex font-sans mxl:text-heading4 text-heading6-M text-gray-900 gap-4 items-center">
            공지 수정하기
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-5">
            <div className="w-full">
              <div className=" flex items-center gap-2">
                <div className=" w-full">
                  제목
                  <Input
                    type="text"
                    onChange={handleTitleChange}
                    value={title}
                    width="full"
                    name="title"
                  />
                </div>
                <div>
                  학년
                  <SelectGrade onSelect={setSelectedGrade} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-end gap-7">
            <div className="flex flex-col w-full">
              내용
              <TextArea
                placeholder="공지 내용 입력"
                type="textarea"
                name="content"
                width="full"
                height="80"
                onChange={handleContentChange}
                value={content}
              />
            </div>
            <Button colorType="primary" buttonSize="small" onClick={() => {}}>
              공지 수정
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyNotice;
