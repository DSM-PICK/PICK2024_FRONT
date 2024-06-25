"use client";

import React, { useEffect, useState } from "react";
import Input from "../components/common/input";
import TextArea from "../components/common/input/textarea";
import BugReportImg from "@/assets/img/Icon/bugreport.svg";
import Button from "../components/common/Button";
import TopBack from "../components/common/background/top";
import { BugImg, BugPost } from "@/apis/bug";
import { useRouter } from "next/navigation";

interface BugProp {
  title: string;
  content: string;
  file_name: string;
}

const BugReport = () => {
  const router = useRouter();

  const [filePreview, setFilePreview] = useState<string>("");
  const [filename, setFilename] = useState<string>("");
  const [data, setData] = useState<BugProp>({
    title: "",
    content: "",
    file_name: "",
  });

  const handleContent = ({ text, name }: { text: string; name: string }) => {
    setData({ ...data, [name]: text });
  };

  const { mutate: BugImgMutate } = BugImg();
  const { mutate: BugPostMutate } = BugPost();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.currentTarget.files?.[0];
    if (selectedFile) {
      setFilePreview(URL.createObjectURL(selectedFile));
      try {
        await BugImgMutate(
          { file: selectedFile },
          {
            onSuccess: (data) => {
              setFilename(data);
            },
            onError: (error) => {
              alert(error.message);
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setData({
      ...data,
      file_name: filename,
    });
  }, [filename]);

  const Bug = async () => {
    await BugPostMutate(data, {
      onSuccess: () => {
        alert("버그가 제보되었습니다.");
        setData({
          title: "",
          content: "",
          file_name: filename ? filename : "",
        });
        setFilePreview("");
        router.push("/main");
      },
      onError: () => {
        console.log("에러가 발생했습니다.");
      },
    });
  };

  return (
    <TopBack
      linkChildren="버그 제보"
      subTitle="버그 제보"
      DropChildren={
        <Button colorType="primary" buttonSize="small" onClick={Bug}>
          버그제보하기
        </Button>
      }
    >
      <div className="w-full flex flex-col gap-12">
        <Input
          type="text"
          label="*어디서 버그가 발생했나요?"
          placeholder="예) 메인페이지"
          width="full"
          name="title"
          onChange={handleContent}
          value={data.title}
        />
        <div>
          <p>*버그에 대해 설명해주세요</p>
          <TextArea
            type="string"
            name="content"
            onChange={handleContent}
            value={data.content}
            placeholder="구체적으로 작성해주세요"
            width="full"
          />
        </div>
        <div className=" mb-11">
          {filePreview ? (
            <img src={filePreview} alt="Bug preview" />
          ) : (
            <>
              <p>버그 사진을 첨부해주세요</p>
              <label
                htmlFor="file-input"
                className="cursor-pointer flex flex-col p-8 justify-center items-center w-full h-max rounded-md bg-neutral-900 text-gray-500 mb-9"
              >
                <img src={BugReportImg.src} alt="bug report icon" />
                <p>사진을 첨부해주세요</p>
              </label>
              <input
                id="file-input"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </>
          )}
        </div>
      </div>
    </TopBack>
  );
};

export default BugReport;
