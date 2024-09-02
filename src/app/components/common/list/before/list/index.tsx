"use client";

import { ChangeOut } from "@/utils/until";
import React from "react";
import OutBedge from "../badge";

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
  return (
    <div className="flex whitespace-nowrap w-full px-4 bg-white rounded-lg">
      <div className=" flex justify-between w-full items-center h-fit py-1">
        <div className=" w-5/6 flex flex-col items-start">
          <div className=" text-label2 w-full  text-ellipsis overflow-hidden">
            {title}
          </div>
          <div className=" text-neutral-300 text-caption3 flex justify-center items-center">
            {type === "APPLICATION"
              ? `${date} ${startTime}~${endTime}`
              : `${date} ${startTime}~`}
          </div>
        </div>
        <OutBedge type={type} />
      </div>
    </div>
  );
};

export default BeforeList;
