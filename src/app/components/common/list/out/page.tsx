"use client";

import React, { useState } from "react";

interface OutProps {
  student: string;
  returnTime: string;
  id: string;
  reason: string;
}

const Out: React.FC<OutProps> = ({ student, returnTime, id, reason }) => {
  return (
    <>
      <div className="rounded-lg flex justify-between items-center bg-white py-5 px-4 w-120 border hover:border-primary-400">
        <div className="flex items-center gap-3">
          <div className=" text-Button-L">{student}</div>
          <div className=" text-caption1 text-neutral-400">
            {returnTime} 복귀예정
          </div>
        </div>
      </div>
    </>
  );
};

export default Out;
