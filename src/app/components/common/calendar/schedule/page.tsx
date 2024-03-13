"use client";
import Calendarmold from "react-calendar";
import "../style/style.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { GetSchdule } from "@/apis/outList/list";

interface calendarProp {
  onClick: (date: Date) => void;
  onChange: (date: Date) => void;
}

interface data {
  id: string;
  event_name: string;
  month: number;
  day: number;
}

const ScheduleCalendar = ({ onClick, onChange }: calendarProp) => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectDate, setSelectDate] = useState<Date | null>(null);
  const [monthdata, setData] = useState<data[]>([]);
  const { mutate: scheduleMutate } = GetSchdule();

  const currentYear = new Date().getFullYear();

  const handleModalCancel = () => {
    setModal(false);
  };

  const handleModalConfirm = () => {
    setModal(false);
  };

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
    <Calendarmold
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
          const dateData = monthdata.filter((item) =>
            console.log(
              `${currentYear.toString()}-${item.month}-${item.day}` ===
                formattedDate
            )
          );

          if (dateData.length > 0) {
            return (
              <>
                {dateData.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white flex px-2 py-1 shadow-md rounded gap-2 w-full"
                  >
                    <div className="h-auto rounded w-0.5 bg-primary-200"></div>
                    <div className="text-black text-Button-ES">
                      {item.event_name}
                    </div>
                  </div>
                ))}
              </>
            );
          }
        }
      }}
    />
  );
};

export default ScheduleCalendar;
