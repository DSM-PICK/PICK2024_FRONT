"use client";

import React from "react";
import ManageDrop from "../../manage";
import ManageState from "./state/page";

interface ManageProps {
  student: string;
  state: string;
  edit: boolean;
  onChange: (option: string) => void; // onChange 함수를 props로 받음
}

const ManageList: React.FC<ManageProps> = ({
  student,
  state,
  edit,
  onChange,
}) => {
  return (
    <div className=" w-77 h-13 rounded-lg flex bg-white py-2 px-4 items-center justify-between">
      <div className=" text-label1 whitespace-nowrap">{student}</div>
      <div>
        {edit ? (
          <ManageState state={state} />
        ) : (
          <ManageDrop state={state} third onChange={onChange} /> // onChange 함수를 전달
        )}
      </div>
    </div>
  );
};

export default ManageList;
