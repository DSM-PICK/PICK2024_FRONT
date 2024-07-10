"use client";

import React, { useState } from "react";

interface OutProps {
  student: string;
  returnTime: string;
  id: string;
  reason: string;
}

const Out: React.FC<OutProps> = ({ student, returnTime, id, reason }) => {
  const [showReason, setShowReason] = useState<boolean>(false);

  return (
    <div
      className="group rounded-lg flex flex-col justify-between bg-white py-5 px-4 w-120 border hover:border-primary-400"
      onClick={() => setShowReason(!showReason)}
    >
      <div className="flex items-center gap-3">
        <div className="text-Button-L">{student}</div>
        <div className="text-caption1 text-neutral-400">
          {returnTime} 복귀예정
        </div>
      </div>
      {showReason || <p className="hidden group-hover:block">{reason}</p>}
    </div>
  );
};

export default Out;
