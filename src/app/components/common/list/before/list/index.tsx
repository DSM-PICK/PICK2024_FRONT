"use client";

import React from "react";

interface Prop {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  type: "APPLICATION" | "EARLY_RETURN";
}

const BeforeList: React.FC<Prop> = ({
  title,
  startTime,
  endTime,
  type,
  date,
}) => {
  const Change = () => {
    if (type === "APPLICATION") {
      return "외출";
    } else if (type === "EARLY_RETURN") {
      return "조기귀가";
    }
  };

  const TimeSet = () => {
    return `${date} ${startTime}~${endTime}`;
  };

  const typeStyle = () => {
    if (type === "APPLICATION") {
      return ` bg-primary-600`;
    } else if (type === "EARLY_RETURN") {
      return `bg-secondary-600`;
    }
  };

  return (
    <div className="flex whitespace-nowrap w-full px-4 bg-white rounded-lg">
      <div className=" flex justify-between w-full items-center h-fit py-1">
        <div className=" w-5/6 flex flex-col items-start">
          <div className=" text-label2 w-full  text-ellipsis overflow-hidden">
            {title}
          </div>
          <div className=" text-neutral-300 text-caption3 flex justify-center items-center">
            {TimeSet()}
          </div>
        </div>
        <div
          className={`${typeStyle()} text-white rounded text-label2 px-1 items-center justify-center h-6 flex`}
        >
          {Change()}
        </div>
      </div>
    </div>
  );
};

export default BeforeList;
