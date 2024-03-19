"use client";
import { useState } from "react";
import { PostNotice } from "@/apis/notice";
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

const WriteNotice = () => {
  const nav = useRouter();
  const { mutate: uploadNotice } = PostNotice();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<number>(1);

  const ColorType = () => {
    if (title === "" || content === "") {
      return "solidDisabled";
    } else return "primary";
  };

  const post = async () => {
    if (ColorType() === "primary") {
      try {
        const result = await uploadNotice(
          { title, content, grade: [selectedGrade] },
          {
            onSuccess: () => {
              nav.push("/notice");
              alert("공지가 등록되었습니다");
            },
            onError: (error) => {
              console.log(error.message);
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleTitleChange = ({ text, name }: ChangeProps) => {
    setTitle(text);
  };

  const handleContentChange = ({ text, name }: ChangeProps) => {
    setContent(text);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-7 min-w-max mxl:px-100 px-64 py-16 h-90dvh">
        <div className=" text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt;
          <Link href="/notice">공지 사항</Link> &gt; 공지사항 작성
        </div>
        <div className="flex justify-between">
          <div className="flex font-sans mxl:text-heading4 text-heading6-M text-gray-900 gap-4 items-center">
            공지 사항
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
                    onChange={handleTitleChange} // 제목 변경 이벤트 핸들러
                    value={title} // 제목 값
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
            <Button colorType={ColorType()} buttonSize="small" onClick={post}>
              공지 업로드
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteNotice;
