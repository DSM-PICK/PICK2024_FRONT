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

interface data {
  floor: number;
  teacher: string;
  date: string;
}
[];

const SelfStudyModal: React.FC<ModalProps> = ({
  heading1,
  onCancel,
  initialDate,
}) => {
  const [secondData, setSecondData] = useState({ floor: 2, teacher: "" });
  const [thirdData, setThirdData] = useState({ floor: 3, teacher: "" });
  const [fourthData, setFourthData] = useState({ floor: 4, teacher: "" });
  const [data, setData] = useState<data[]>([]);

  const { mutate: postTeacherMutate } = PostTeacher();
  const { mutate: SelectSelfListMutate } = SelectTeacher();

  const select = async () => {
    try {
      SelectSelfListMutate(
        { date: moment(initialDate).format("YYYY-MM-DD") },
        {
          onSuccess: (data) => {
            setData(data);
          },
          onError: (error) => {
            alert(error.name);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    select();
  }, []);

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
          alert("등록에 성공하였습니다");
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

  const SecondhandleChange = ({ text, name }: ChangeProps) => {
    setSecondData({ ...secondData, [name]: text });
  };
  const thirdhandleChange = ({ text, name }: ChangeProps) => {
    setThirdData({ ...thirdData, [name]: text });
  };
  const fourthhandleChange = ({ text, name }: ChangeProps) => {
    setFourthData({ ...fourthData, [name]: text });
  };

  console.log(data);

  return (
    <div className=" z-10 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-30">
      <div className=" bg-white rounded-xl px-24 py-13 w-155">
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
            {data.map((item, index) => (
              <>
                <AutoInput
                  type="teacher"
                  onChange={SecondhandleChange}
                  value={secondData.teacher || item.teacher}
                  placeholder="선생님 이름을 입력해주세요."
                  width="full"
                  name="teacher"
                />
                <AutoInput
                  type="teacher"
                  onChange={thirdhandleChange}
                  value={thirdData.teacher || item.teacher}
                  placeholder="선생님 이름을 입력해주세요."
                  width="full"
                  name="teacher"
                />
                <AutoInput
                  type="teacher"
                  onChange={fourthhandleChange}
                  value={fourthData.teacher || item.teacher}
                  placeholder="선생님 이름을 입력해주세요."
                  width="full"
                  name="teacher"
                />
              </>
            ))}
          </div>
        </div>

        {renderButtons()}
      </div>
    </div>
  );
};

export default SelfStudyModal;
