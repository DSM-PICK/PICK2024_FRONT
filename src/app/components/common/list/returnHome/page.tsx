import React from "react";

interface HomeProps {
  student: string;
  returnTime: string;
}

export const ReturnHome: React.FC<HomeProps> = ({ student, returnTime }) => {
  return (
    <div className=" rounded-lg flex gap-3 items-center bg-white py-6 px-4 w-120">
      <div className="font-sans text-Button-L">{student}</div>
      <div className="font-sans text-caption1 text-neutral-400">
        {returnTime} 복귀예정
      </div>
    </div>
  );
};
