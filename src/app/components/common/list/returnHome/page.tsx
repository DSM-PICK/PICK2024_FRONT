import React from "react";

interface HomeProps {
  student: string;
}

const ReturnHome: React.FC<HomeProps> = ({ student }) => {
  return (
    <div className=" rounded-lg flex gap-3 items-center bg-white py-6 px-4 w-120">
      <div className=" text-Button-L">{student}</div>
    </div>
  );
};

export default ReturnHome;
