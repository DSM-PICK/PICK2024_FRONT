import Calendarmold from "react-calendar";
import CalendarCss from "./style/style.css";
import moment from "moment";

interface calendarProp {
  data: Record<string, string[]>;
  onClick: (date: Date) => void;
}

export const Calendar: React.FC<calendarProp> = ({ data, onClick }) => {
  return (
    <Calendarmold
      className={CalendarCss}
      prev2Label={null}
      onClickDay={(date) => onClick(date)} // 수정된 부분
      next2Label={null}
      calendarType="US"
      formatDay={(locale, date) =>
        date.toLocaleString("en", { day: "numeric" })
      }
      tileContent={({ date }) => {
        const formattedDate = moment(date).format("YYYY-MM-DD");

        if (data && data[formattedDate]) {
          return data[formattedDate].map((teacher, index) => (
            <div
              className="bg-white flex px-2 py-1 shadow-md rounded gap-2 w-full"
              key={index}
            >
              <div className="h-auto rounded w-0.5 bg-primary-200"></div>
              <div className="text-black text-Button-ES">{teacher}</div>
            </div>
          ));
        }
      }}
    />
  );
};
