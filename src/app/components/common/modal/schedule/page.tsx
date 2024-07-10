"use client";
import React, { useState } from "react";
import moment from "moment";
import Button from "../../Button";
import Input from "../../input";
import { AddSchedule } from "@/apis/schedule";

export interface ChangeProps {
  text: string;
  name: string;
}

interface ModalProps {
  heading1?: string;
  onCancel: () => void;
  initialDate: string;
}

interface ScheduleData {
  event_name: string;
  date: string | null;
}

const PostSchedule: React.FC<ModalProps> = ({ onCancel, initialDate }) => {
  const formattedDate = initialDate
    ? moment(initialDate).format("YYYY-MM-DD")
    : null;
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    event_name: "",
    date: formattedDate,
  });
  const { mutate: addScheduleMutate } = AddSchedule();

  const handleModalCancel = () => {
    onCancel();
  };

  const handleModalConfirm = async () => {
    try {
      const newScheduleData: ScheduleData = {
        event_name: scheduleData.event_name,
        date: formattedDate,
      };
      await addScheduleMutate(newScheduleData, {
        onSuccess: () => {
          location.reload();
          alert("일정이 추가되었습니다");
        },
        onError: (error) => {
          console.log(error);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeSchedule = ({ text, name }: ChangeProps) => {
    setScheduleData({ ...scheduleData, [name]: text });
  };

  return (
    <div className=" z-10 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-30">
      <div className=" bg-white rounded-xl px-24 py-13 w-155 gap-20 flex flex-col">
        <div className="flex flex-col gap-8 items-center">
          <div className="text-neutral-50 text-center">
            <div className="flex gap-1 text-heading6-M max-w-none">
              <div className="text-primary-400">
                {initialDate && moment(initialDate).format("M월 DD일")}
              </div>
              <div>새로운 일정 추가</div>
            </div>
          </div>
          <Input
            type="text"
            label="제목*"
            onChange={changeSchedule}
            value={scheduleData.event_name}
            name="event_name"
            placeholder="일정 제목"
            width="full"
          />
        </div>
        <div className="flex gap-6">
          <Button
            colorType="ghost"
            buttonSize="large"
            onClick={handleModalCancel}
          >
            취소
          </Button>
          <Button
            colorType="primary"
            buttonSize="large"
            onClick={handleModalConfirm}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostSchedule;
