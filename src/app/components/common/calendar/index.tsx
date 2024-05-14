"use client";
import Calendarmold from "react-calendar";
import "./style/style.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { SelfstudyGet } from "@/apis/changeTeacher";
import SelfStudyModal from "../modal/selfStudyTeacher.tsx/page";
import { useRouter } from "next/navigation";

interface CalendarData {
  floor: number;
  teacher: string;
  date: string;
}

const Calendar = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectDate, setSelectDate] = useState<Date | null>(null);
  const [monthdata, setData] = useState<CalendarData[]>([]);
  const { mutate: selfstudyMutate } = SelfstudyGet();

  const router = useRouter();

  const handleModalCancel = () => {
    setModal(false);
  };

  const handleModalConfirm = () => {
    setModal(false);
    router.push("/changeTeacher");
  };

  const studyData = async (selectDate: Date | null) => {
    const formattedDate = moment(selectDate).format("MMMM");
    const currentYear = new Date().getFullYear();
    try {
      await selfstudyMutate(
        {
          month: formattedDate,
          year: currentYear.toString(),
        },
        {
          onSuccess: (data) => {
            setData(data);
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
    studyData(currentDate);
  }, []);

  return (
    <>
      <Calendarmold
        prev2Label={null}
        onActiveStartDateChange={({ activeStartDate }) =>
          studyData(activeStartDate)
        }
        onClickDay={(date) => {
          setModal(true);
          setSelectDate(date);
        }}
        next2Label={null}
        calendarType="gregory"
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        tileContent={({ date }) => {
          const formattedDate = moment(date).format("YYYY-MM-DD");

          if (monthdata) {
            const dateData = monthdata
              .filter((item) => item.date === formattedDate)
              .sort((i, j) => {
                return j.floor - i.floor;
              });
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
                        {item.teacher}
                      </div>
                    </div>
                  ))}
                </>
              );
            }
          }
        }}
      />
      {modal && (
        <SelfStudyModal
          initialDate={selectDate}
          heading1="자습감독 변경"
          onCancel={handleModalCancel}
          onSuccess={handleModalConfirm}
        />
      )}
    </>
  );
};

export default Calendar;
