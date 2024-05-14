"use client";
import React from "react";
import ClassmealDrop from "../../dropdown/state/class/page";

interface allmealsProps {
  number: string;
  name: string;
  state: "OK" | "NO" | "QUIET";
  id: string;
  onclick: () => void;
}

const Classmeals = ({ number, name, state, id, onclick }: allmealsProps) => {
  const change = () => {
    switch (state) {
      case "NO":
        return "미신청";
      case "OK":
        return "신청";
      case "QUIET":
        return "미응답";
    }
  };

  return (
    <div className=" w-11/12 rounded flex items-center justify-between px-6 py-2 bg-white">
      <div className=" flex gap-1 text-Button-L text-neutral-100">
        <div>{number}</div>
        <div>{name}</div>
      </div>
      <ClassmealDrop option={change()} id={id} onclick={onclick} />
    </div>
  );
};

export default Classmeals;
