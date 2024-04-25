"use client";
import { getToday } from "@/utils/date";

interface ReasonListProps {
  student: string;
  time: string;
  endTime?: string;
  why: string;
}

const ReasonList: React.FC<ReasonListProps> = ({
  student,
  time,
  why,
  endTime,
}) => {
  const MAX_WHY_LENGTH = 69;

  let whyDisplay = why;
  if (why?.length > MAX_WHY_LENGTH) {
    whyDisplay = why.substring(0, MAX_WHY_LENGTH) + "...";
  }

  return (
    <div className="flex flex-col bg-white px-5 py-5 h-fit gap-3 w-120 rounded-lg">
      <div className="flex gap-4">
        <div className=" text-label1 text-neutral-50">{student}</div>
        <div className="text-neutral-400">
          {getToday()} • {time}~{endTime}
        </div>
      </div>
      <div className="h-11 text-neutral-200  text-label1 text-wrap">
        {whyDisplay}
      </div>
    </div>
  );
};

export default ReasonList;
