"use client";
import React, { useState } from "react";
import moment from "moment";
import { Button } from "../..";
import Input from "../../input";
import { postTeacher } from "@/apis/outList/list";

export interface ChangeProps {
  text: string;
  name: string;
}

interface ModalProps {
  heading1?: string;
  onCancel: () => void;
  initialDate?: Date | null;
}

export const SelfStudyModal: React.FC<ModalProps> = ({
  heading1,
  onCancel,
  initialDate,
}) => {
  const postData = initialDate ? moment(initialDate).format("YYYY-MM-DD") : "";
  const [seconddata, setSecondData] = useState({
    floor: 2,
    teacher: "",
    date: postData,
  });
  const [thirdData, setThirdData] = useState({
    floor: 3,
    teacher: "",
    date: postData,
  });
  const [fourthData, setfourthData] = useState({
    floor: 4,
    teacher: "",
    date: postData,
  });

  const { mutate: postTeacherMutate } = postTeacher();

  const subTeacher = async () => {
    try {
      await postTeacherMutate([fourthData, seconddata, thirdData], {
        onSuccess: () => {
          console.log("success");
        },
        onError: (error) => {
          console.log(error);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sub = () => {
    subTeacher();
  };

  const SecondhandleChange = ({ text, name }: ChangeProps) => {
    setSecondData({ ...seconddata, [name]: text });
  };
  const thirdhandleChange = ({ text, name }: ChangeProps) => {
    setThirdData({ ...thirdData, [name]: text });
  };
  const fourthhandleChange = ({ text, name }: ChangeProps) => {
    setfourthData({ ...fourthData, [name]: text });
  };

  const formetDate = initialDate
    ? moment(initialDate).format("M월 DD일")
    : null;

  const renderButtons = () => {
    return (
      <div className="flex gap-6">
        <Button
          colorType="ghost"
          children="취소"
          buttonSize="large"
          onClick={onCancel}
        />
        <Button
          colorType="primary"
          children="확인"
          buttonSize="large"
          onClick={sub}
        />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-30">
      <div className="bg-white rounded-xl px-24 py-13 w-155">
        <div className="flex flex-col gap-8 items-center">
          <div className=" text-neutral-50 text-center">
            {heading1 && (
              <div className=" flex gap-1 text-heading6-M max-w-none">
                <div className=" text-primary-400">{formetDate}</div>
                <div>{heading1}</div>
              </div>
            )}
          </div>
          <div className=" flex flex-col gap-4">
            <Input
              type="text"
              label="2층 자습감독"
              onChange={SecondhandleChange}
              value={seconddata.teacher}
              name="teacher"
              placeholder="선생님 이름을 입력해주세요."
              width="92"
            />
            <Input
              type="text"
              label="3층 자습감독"
              onChange={thirdhandleChange}
              value={thirdData.teacher}
              name="teacher"
              placeholder="선생님 이름을 입력해주세요."
              width="92"
            />
            <Input
              type="text"
              label="4층 자습감독"
              onChange={fourthhandleChange}
              value={fourthData.teacher}
              name="teacher"
              placeholder="선생님 이름을 입력해주세요."
              width="92"
            />
          </div>
          {renderButtons()}
        </div>
      </div>
    </div>
  );
};
