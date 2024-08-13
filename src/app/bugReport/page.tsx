"use client";

import React, { useState } from "react";
import Input from "../components/common/input";
import TextArea from "../components/common/input/textarea";
import BugReportImg from "@/assets/img/Icon/bugreport.svg";
import Button from "../components/common/Button";
import TopBack from "../components/common/background/top";
import { BugImg, BugPost } from "@/apis/bug";
import { useRouter } from "next/navigation";
import ImgModal from "../components/common/modal/imgModal";

interface BugProp {
  title: string;
  content: string;
  file_name: string[];
}

const BugReport = () => {
  const router = useRouter();

  const [data, setData] = useState<BugProp>({
    title: "",
    content: "",
    file_name: [],
  });

  const handleContent = ({ text, name }: { text: string; name: string }) => {
    setData((prevData) => ({
      ...prevData,
      [name]: text,
    }));
  };

  const [modal, setModal] = useState<boolean>(false);

  const { mutate: BugImgMutate } = BugImg();
  const { mutate: BugPostMutate } = BugPost();

  const handleImgUpload = async (images: File[]) => {
    try {
      const response = await BugImgMutate(
        { file: images },
        {
          onSuccess: (data) => {
            setData((prevData) => ({
              ...prevData,
              file_name: data,
            }));
          },
        }
      );

      console.log("Uploaded:", response);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const Bug = async () => {
    await BugPostMutate(data, {
      onSuccess: () => {
        alert("버그가 제보되었습니다.");
        setData({
          title: "",
          content: "",
          file_name: [],
        });
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
        <div className="mb-11">
          {data.file_name.length === 0 ? (
            <>
              <p>버그 사진을 첨부해주세요</p>
              <label
                htmlFor="file-input"
                className="cursor-pointer flex flex-col p-8 justify-center items-center w-full h-max rounded-md bg-neutral-900 text-gray-500 mb-9"
                onClick={() => {
                  setModal(true);
                }}
              >
                <img src={BugReportImg.src} alt="bug report icon" />
                <p>사진을 첨부해주세요</p>
              </label>
              <div
                id="file-input"
                className="hidden"
                onChange={() => {
                  setModal(!modal);
                }}
              />
            </>
          ) : (
            <div className=" flex gap-1">
              {data.file_name.map((item) => (
                <img
                  src={`${process.env.NEXT_PUBLIC_FILE_APP}${item}`}
                  width={200}
                  height={200}
                />
              ))}
              <label
                htmlFor="file-input"
                className="cursor-pointer flex flex-col p-8 justify-center items-center w-full h-max rounded-md bg-neutral-900 text-gray-500 mb-9"
                onClick={() => {
                  setModal(true);
                }}
              >
                <img src={BugReportImg.src} alt="bug report icon" />
                <p>사진을 첨부해주세요</p>
              </label>
              <div
                id="file-input"
                className="hidden"
                onChange={() => {
                  setModal(!modal);
                }}
              />
            </div>
          )}
        </div>
        <ImgModal
          onClick={handleImgUpload}
          isOpen={modal}
          onClose={() => {
            setModal(!modal);
          }}
        />
      </div>
    </TopBack>
  );
};

export default BugReport;
