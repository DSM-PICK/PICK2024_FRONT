"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "../style/style.css";
import Calendar from "react-calendar";
import { GetSchdule } from "@/apis/outList/list";
import Modal from "../../modal/page";
import ScheduleFix from "./fix";
import PostSchedule from "../../modal/schdule/page";

interface CalendarProps {
  onClick: (date: Date) => void;
  onChange: (date: Date) => void;
}

interface Schedule {
  id: string;
  event_name: string;
  month: number;
  day: number;
}

const ScheduleCalendar: React.FC<CalendarProps> = ({ onClick, onChange }) => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectDate, setSelectDate] = useState<Date | null>(null);
  const [monthData, setMonthData] = useState<Schedule[]>([]);
  const { mutate: scheduleMutate } = GetSchdule();

  const currentYear = new Date().getFullYear();

  const scheduleData = async (selectDate: Date | null) => {
    const formattedDate = moment(selectDate).format("MMMM");

    try {
      const result = await scheduleMutate(
        {
          year: currentYear.toString(),
          month: formattedDate,
        },
        {
          onSuccess: (data) => {
            console.log("success");
            setMonthData(data);
            console.log(data);
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    console.log(currentDate);

    scheduleData(currentDate);
  }, []);

  const handleModalCancel = () => {
    setModal(false);
  };

  const handleModalConfirm = () => {
    setModal(false);
    scheduleData(selectDate);
  };

  return (
    <>
      <Calendar
        prev2Label={null}
        onClickMonth={(date) => {
          onChange(date);
        }}
        onActiveStartDateChange={({ activeStartDate }) =>
          scheduleData(activeStartDate)
        }
        onClickDay={(date) => {
          setSelectDate(date);
          setModal(true);
          onClick(date);
        }}
        next2Label={null}
        calendarType="gregory"
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        tileContent={({ date }) => {
          const formattedDate = moment(date).format("M-D");

          if (monthData) {
            const dateData = monthData.filter(
              (item) => formattedDate === `${item.month}-${item.day}`
            );

            if (dateData.length > 0) {
              return (
                <>
                  {dateData.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white flex justify-between px-2 py-1 shadow-md rounded w-full"
                    >
                      <div className=" flex gap-2">
                        <div className="h-auto rounded w-0.5 bg-primary-200"></div>
                        <div className="text-black text-Button-ES">
                          {item.event_name}
                        </div>
                      </div>
                      <ScheduleFix />
                    </div>
                  ))}
                </>
              );
            }
          }
        }}
      />
      {modal && (
        <PostSchedule
          date={selectDate}
          type="addSchedule"
          heading1="새로운 일정"
          buttonMessage="추가"
          onCancel={handleModalCancel}
          onConfirm={handleModalConfirm}
        />
      )}
    </>
  );
};

export default ScheduleCalendar;
