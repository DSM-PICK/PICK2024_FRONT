import React from "react";
import { AllmealDrop } from "../../dropdown/state/page";

interface allmealsProps {
  number: string;
  name: string;
  state: boolean;
}

export const Allmeals: React.FC<allmealsProps> = ({ number, name, state }) => {
  return (
    <div className=" w-full rounded flex items-center justify-between px-30 bg-primary-1000 py-2">
      <div className=" flex gap-32 text-caption1 text-neutral-100">
        <div>{number}</div>
        <div>{name}</div>
      </div>{" "}
      <AllmealDrop state={state} />
    </div>
  );
};
