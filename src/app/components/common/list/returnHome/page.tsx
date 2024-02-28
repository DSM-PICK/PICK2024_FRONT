import React from "react";

interface HomeProps {
  student: string;
}

export const ReturnHome: React.FC<HomeProps> = ({ student }) => {
  return (
    <div className=" rounded-lg flex gap-3 items-center bg-white py-6 px-4 w-120">
      <div className="font-sans text-Button-L">{student}</div>
    </div>
  );
};
