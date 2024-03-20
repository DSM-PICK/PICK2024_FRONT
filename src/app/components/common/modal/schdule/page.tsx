"use client";
import React, { useState } from "react";
import moment from "moment";
import Button from "../../Button";
import Input from "../../input";
import { AddSchedule } from "@/apis/outList/list";

export interface ChangeProps {
  text: string;
  name: string;
}

interface ModalProps {
  heading1?: string;
  onCancel: () => void;
  onSuccess: () => void;
  initialDate: Date | null;
}

interface ScheduleData {
  eventName: string;
  date: string;
}

const PostSchedule: React.FC<ModalProps> = ({
  heading1,
  onCancel,
  initialDate,
  onSuccess,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    eventName: "",
    date: "",
  });
  const { mutate: addScheduleMutate } = AddSchedule();

  const handleChangeDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleModalCancel = () => {
    onCancel();
  };

  const handleModalConfirm = async () => {
    try {
      const formattedDate = selectedDate
        ? moment(selectedDate).format("YYYY-MM-DD")
        : null;
      const newScheduleData: ScheduleData = {
        eventName: scheduleData.eventName,
        date: formattedDate || "",
      };
      setScheduleData(newScheduleData);
      await addScheduleMutate(newScheduleData, {
        onSuccess: () => {
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
          <Input
            type="text"
            label="제목*"
            onChange={changeSchedule}
            value={scheduleData.eventName}
            name="eventName"
            placeholder="일정 제목"
            width="92"
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
