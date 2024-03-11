"use client";
import Calendarmold from "react-calendar";
import CalendarCss from "../style/style.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { getSchdule } from "@/apis/outList/list";

interface calendarProp {
  onClick: (date: Date) => void;
  onChange: (date: Date) => void;
}

interface data {
  date: string;
  event_name: string;
  id: string;
}

export const ScheduleCalendar: React.FC<calendarProp> = ({
  onClick,
  onChange,
}) => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectDate, setSelectDate] = useState<Date | null>(null);
  const [monthdata, setData] = useState<data[]>([]);
  const { mutate: scheduleMutate } = getSchdule();

  const handleModalCancel = () => {
    setModal(false);
  };

  const handleModalConfirm = () => {
    setModal(false);
  };

  const scheduleData = async (selectDate: Date | null) => {
    const formattedDate = moment(selectDate).format("MMMM");
    const currentYear = new Date().getFullYear();
    console.log(formattedDate);
    try {
      const result = await scheduleMutate(
        {
          year: currentYear.toString(),
          month: formattedDate,
        },
        {
          onSuccess: (data) => {
            console.log("success");
            setData(data);
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

  return (
    <>
      <Calendarmold
        className={CalendarCss}
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
          const formattedDate = moment(date).format("YYYY-MM-DD");

          if (monthdata) {
            const dateData = monthdata.find(
              (item) => item.date === formattedDate
            );
            if (dateData) {
              return (
                <div className="bg-white flex px-2 py-1 shadow-md rounded gap-2 w-full">
                  <div className="h-auto rounded w-0.5 bg-primary-200"></div>
                  <div className="text-black text-Button-ES">
                    {dateData.event_name}
                  </div>
                </div>
              );
            }
          }
        }}
      />
    </>
  );
};
