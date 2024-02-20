import ManageDrop from "../../dropdown/manage/page";
import { ManageState } from "./state/page";
import react, { useState } from "react";

interface ManageProps {
  student: string;
  state: "출석" | "현체" | "귀가" | "취업" | "자퇴";
  edit: boolean;
}

export const ManageList: React.FC<ManageProps> = ({ student, state, edit }) => {
  return (
    <div className=" w-77 h-13 gap-24 rounded-lg flex bg-white py-2 px-4 items-center justify-between">
      <div className=" text-label1">{student}</div>
      <div>
        {edit ? (
          <ManageState state={state} />
        ) : (
          <ManageDrop state={state} third />
        )}
      </div>
    </div>
  );
};