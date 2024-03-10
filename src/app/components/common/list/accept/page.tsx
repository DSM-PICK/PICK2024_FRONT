"use client";

import React, { useState } from "react";

interface AcceptProps {
  student: string;
  time: string;
  why: string;
  onClick: () => void;
}

export const AcceptList: React.FC<AcceptProps> = ({
  student,
  time,
  why,
  onClick,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onClick();
  };

  return (
    <div
      className={`flex w-80 flex-col px-3 py-3 rounded-lg group h-13 gap-2 active:bg-primary-800 ${
        isActive
          ? "bg-primary-900 h-auto"
          : " bg-white hover:h-auto hover:bg-primary-900 h-13"
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between">
        <div className="text-label1">{student}</div>
        <div className="text-neutral-400">{time}</div>
      </div>
      <div className={`${isActive ? "flex" : "hidden"} group-hover:flex`}>
        {why}
      </div>
    </div>
  );
};
