import { getToday } from "@/utils/date";

interface ReasonListProps {
  student: string;
  time: string;
  endTime?: string;
  why: string;
}

export const ReasonList: React.FC<ReasonListProps> = ({
  student,
  time,
  why,
  endTime,
}) => {
  return (
    <div className=" flex flex-col bg-white px-5 py-5 gap-3 w-120 rounded-lg">
      <div className=" flex gap-4">
        <div className="font-sans text-label1 text-neutral-50">{student}</div>
        <div className=" text-neutral-400">
          {getToday()} • {time}~{endTime}
        </div>
      </div>
      <div className=" h-11 text-neutral-200 font-sans text-label1">{why}</div>
    </div>
  );
};
