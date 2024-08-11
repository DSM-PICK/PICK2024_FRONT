"use client";

import React, { useState } from "react";

interface OutProps {
  student: string;
  returnTime: string;
  id: string;
  reason: string;
  onClick: () => void;
}

const Out: React.FC<OutProps> = ({ student, returnTime, reason, onClick }) => {
  const [showReason, setShowReason] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);

  const handleClickStudent = () => {
    setShowReason(!showReason);
    setClick(!click);
    onClick();
  };

  return (
    <div
      className={`group rounded-lg flex flex-col justify-between bg-white py-5 px-4 w-120 border ${
        click ? "border-primary-400" : "hover:border-primary-400"
      }`}
      onClick={handleClickStudent}
    >
      <div className="flex items-center gap-3">
        <div className="text-Button-L">{student}</div>
        <div className="text-caption1 text-neutral-400">
          {returnTime} 복귀예정
        </div>
      </div>
      {showReason || <p className="hidden group-hover:block">{reason}</p>}
      {click && <p>{reason}</p>}
    </div>
  );
};

export default Out;
