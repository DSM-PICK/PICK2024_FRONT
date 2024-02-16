import React from "react";
import { ClassmealDrop } from "../../dropdown/state/class/page";

interface allmealsProps {
  number: string;
  name: string;
  state: "신청" | "미신청" | "미응답";
}

export const Classmeals: React.FC<allmealsProps> = ({
  number,
  name,
  state,
}) => {
  return (
    <div className=" w-120 rounded flex items-center justify-between px-6 py-2 bg-white">
      <div className=" flex gap-1 text-Button-L text-neutral-100">
        <div>{number}</div>
        <div>{name}</div>
      </div>
      <ClassmealDrop state={state} />
    </div>
  );
};
