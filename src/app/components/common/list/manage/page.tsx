"use client";
import ManageDrop from "../../manage";
import ManageState from "./state/page";

interface ManageProps {
  student: string;
  state: string;
  edit: boolean;
}

const ManageList: React.FC<ManageProps> = ({ student, state, edit }) => {
  console.log(state);
  return (
    <div className=" w-77 h-13 rounded-lg flex bg-white py-2 px-4 items-center justify-between">
      <div className=" text-label1 whitespace-nowrap">{student}</div>
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

export default ManageList;
