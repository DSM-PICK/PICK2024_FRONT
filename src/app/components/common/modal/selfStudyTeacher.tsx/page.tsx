"use client";
import React, { useState } from "react";
import moment from "moment";
import Button from "../../Button";
import Input from "../../input";
import { PostTeacher } from "@/apis/outList/list";

export interface ChangeProps {
  text: string;
  name: string;
}

interface postTeacherProp {
  date: string;
  teachers: { floor: number; teacher: string }[];
}

interface ModalProps {
  heading1?: string;
  onCancel: () => void;
  initialDate: Date | null;
}

const SelfStudyModal: React.FC<ModalProps> = ({
  heading1,
  onCancel,
  initialDate,
}) => {
  const [secondData, setSecondData] = useState({ floor: 2, teacher: "" });
  const [thirdData, setThirdData] = useState({ floor: 3, teacher: "" });
  const [fourthData, setFourthData] = useState({ floor: 4, teacher: "" });

  const { mutate: postTeacherMutate } = PostTeacher();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    floor: number
  ) => {
    const { value } = event.target;
    switch (floor) {
      case 2:
        setSecondData({ ...secondData, teacher: value });
        break;
      case 3:
        setThirdData({ ...thirdData, teacher: value });
        break;
      case 4:
        setFourthData({ ...fourthData, teacher: value });
        break;
      default:
        break;
    }
  };

  const submitTeachers = async () => {
    try {
      const postData: postTeacherProp = {
        date: moment(initialDate).format("YYYY-MM-DD"),
        teachers: [
          { floor: secondData.floor, teacher: secondData.teacher },
          { floor: thirdData.floor, teacher: thirdData.teacher },
          { floor: fourthData.floor, teacher: fourthData.teacher },
        ],
      };
      await postTeacherMutate(postData, {
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

  const renderButtons = () => (
    <div className="flex gap-6">
      <Button colorType="ghost" buttonSize="large" onClick={onCancel}>
        취소
      </Button>
      <Button colorType="primary" buttonSize="large" onClick={submitTeachers}>
        확인
      </Button>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-30">
      <div className="bg-white rounded-xl px-24 py-13 w-155">
        <div className="flex flex-col gap-8 items-center">
          <div className="text-neutral-50 text-center">
            {heading1 && (
              <div className="flex gap-1 text-heading6-M max-w-none">
                <div className="text-primary-400">
                  {initialDate && moment(initialDate).format("M월 DD일")}
                </div>
                <div>{heading1}</div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              label="2층 자습감독"
              onChange={(e) => handleChange(e, 2)}
              value={secondData.teacher}
              placeholder="선생님 이름을 입력해주세요."
              width="92"
            />
            <Input
              type="text"
              label="3층 자습감독"
              onChange={(e) => handleChange(e, 3)}
              value={thirdData.teacher}
              placeholder="선생님 이름을 입력해주세요."
              width="92"
            />
            <Input
              type="text"
              label="4층 자습감독"
              onChange={(e) => handleChange(e, 4)}
              value={fourthData.teacher}
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

export default SelfStudyModal;
