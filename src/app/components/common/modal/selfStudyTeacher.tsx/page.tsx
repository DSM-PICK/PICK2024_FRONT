"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Button from "../../Button";
import { PostTeacher, SelectTeacher } from "@/apis/changeTeacher";
import AutoInput from "../../input/auto/page";

export interface ChangeProps {
  text: string;
  name: string;
}

interface postTeacherProp {
  date: string;
  teacher: { floor: number; teacher: string }[];
}

interface ModalProps {
  heading1?: string;
  onCancel: () => void;
  onSuccess: () => void;
  initialDate: Date | null;
}

interface DataItem {
  floor: number;
  teacher: string;
  date: string;
}

const SelfStudyModal: React.FC<ModalProps> = ({
  heading1,
  onCancel,
  initialDate,
}) => {
  const [secondData, setSecondData] = useState({ floor: 2, teacher: "" });
  const [thirdData, setThirdData] = useState({ floor: 3, teacher: "" });
  const [fourthData, setFourthData] = useState({ floor: 4, teacher: "" });
  const [data, setData] = useState<DataItem[]>([]);
  const [teachers, setTeachers] = useState<string[]>([]);

  const { mutate: postTeacherMutate } = PostTeacher();
  const date = moment(initialDate).format("YYYY-MM-DD");
  const { data: SelectSelfList } = SelectTeacher(date);

  useEffect(() => {
    if (SelectSelfList) {
      setData(SelectSelfList);
    }
  }, [SelectSelfList]);

  useEffect(() => {
    data.forEach((val) => {
      switch (val.floor) {
        case 2:
          setSecondData({ floor: 2, teacher: val.teacher });
          break;
        case 3:
          setThirdData({ floor: 3, teacher: val.teacher });
          break;
        case 4:
          setFourthData({ floor: 4, teacher: val.teacher });
          break;
      }
    });
  }, [data]);

  const Post = () => {
    submitTeachers();
  };

  const submitTeachers = async () => {
    try {
      const postData: postTeacherProp = {
        date: moment(initialDate).format("YYYY-MM-DD"),
        teacher: [
          { floor: secondData.floor, teacher: secondData.teacher },
          { floor: thirdData.floor, teacher: thirdData.teacher },
          { floor: fourthData.floor, teacher: fourthData.teacher },
        ],
      };

      await postTeacherMutate(postData, {
        onSuccess: () => {
          location.reload();
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderButtons = () => (
    <div className="flex gap-6">
      <Button colorType="ghost" buttonSize="large" onClick={onCancel}>
        취소
      </Button>
      <Button colorType="primary" buttonSize="large" onClick={Post}>
        확인
      </Button>
    </div>
  );

  const SecondhandleChange = ({ text, name }: ChangeProps) => {
    setSecondData({ ...secondData, [name]: text });
  };

  const thirdhandleChange = ({ text, name }: ChangeProps) => {
    setThirdData({ ...thirdData, [name]: text });
  };

  const fourthhandleChange = ({ text, name }: ChangeProps) => {
    setFourthData({ ...fourthData, [name]: text });
  };

  return (
    <div className="z-10 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-30">
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
          <div className="flex flex-col gap-4 w-full">
            <div className=" flex flex-col">
              <div>4층 자습감독</div>
              <AutoInput
                type="teacher"
                onChange={fourthhandleChange}
                value={fourthData.teacher}
                placeholder="4층 자습감독"
                width="full"
                name="teacher"
              />
            </div>
            <div className=" flex flex-col">
              <div>3층 자습감독</div>
              <AutoInput
                type="teacher"
                onChange={thirdhandleChange}
                value={thirdData.teacher}
                placeholder="3층 자습감독"
                width="full"
                name="teacher"
              />
            </div>
            <div className=" flex flex-col">
              <div>2층 자습감독</div>
              <AutoInput
                type="teacher"
                onChange={SecondhandleChange}
                value={secondData.teacher}
                placeholder="2층 자습감독"
                width="full"
                name="teacher"
              />
            </div>
          </div>
          {renderButtons()}
        </div>
      </div>
    </div>
  );
};

export default SelfStudyModal;
