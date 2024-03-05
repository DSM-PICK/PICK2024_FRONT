import Calendarmold from "react-calendar";
import CalendarCss from "./style/style.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { selfstudyGet } from "@/apis/outList/list";
import Modal from "../modal/page";

interface calendarProp {
  onClick: (date: Date) => void;
  onChange: (date: Date) => void;
}

interface data {
  floor: number;
  teacher: string;
  date: string;
}

export const Calendar: React.FC<calendarProp> = ({ onClick, onChange }) => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectDate, setSelectDate] = useState<Date | null>(null);
  const [monthdata, setData] = useState<data[]>([]);
  const { mutate: selfstudyMutate } = selfstudyGet();

  const handleModalCancel = () => {
    setModal(false);
  };

  const handleModalConfirm = () => {
    setModal(false);
  };

  const studyData = async (selectDate: Date | null) => {
    const formattedDate = moment(selectDate).format("MMMM");
    const currentYear = new Date().getFullYear();
    console.log(formattedDate);
    try {
      const result = await selfstudyMutate(
        {
          month: formattedDate,
          year: currentYear.toString(),
        },
        {
          onSuccess: (data) => {
            console.log("success");
            setData(data);
            console.log(data); // 확인용 로그
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

    studyData(currentDate);
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
          studyData(activeStartDate)
        }
        onClickDay={(date) => {
          setSelectDate(date);
          setModal(true);
          onClick(date);
        }}
        next2Label={null}
        calendarType="US"
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
                    {dateData.teacher.map((item, index) => (
                      <span key={index}>{item}</span>
                    ))}
                  </div>
                </div>
              );
            }
          }
        }}
      />
      {modal && (
        <Modal
          teachers={monthdata.map((item) => item.teacher)}
          date={selectDate}
          type="changeTeacher"
          heading1="자습감독 변경"
          buttonMessage="확인"
          onCancel={handleModalCancel}
          onConfirm={handleModalConfirm}
        />
      )}
    </>
  );
};
