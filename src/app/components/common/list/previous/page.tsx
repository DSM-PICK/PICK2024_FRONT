import React from "react";

interface previousProps {
  type: "APPLICATION" | "EARLY_RETURN";
  date: string;
  time: string;
  why: string;
}

const PreviousList: React.FC<previousProps> = ({
  type,
  date,
  time,
  why,
}) => {
  const typeClass =
    type === "EARLY_RETURN" ? "bg-primary-900" : "bg-tertiary-900";
  const center =
    "flex justify-center items-center text-sub-title1-M text-neutral-50 h-15";

  return (
    <div className="flex gap-10">
      <div className={`rounded-lg w-36 ${center} ${typeClass}`}>
        {type === "EARLY_RETURN" ? "조기귀가" : "외출"}
      </div>
      <div className="flex rounded-lg bg-white">
        <div className={`${center} w-44`}>{date}</div>
        <div className={`${center} w-54 border-l-1 border-primary-800`}>
          {time}
        </div>
        <div
          className={`${center} w-120 border-l-1 border-primary-800 px-5 text-center`}
        >
          <div className=" text-ellipsis whitespace-nowrap overflow-hidden w-100">
            {why}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousList