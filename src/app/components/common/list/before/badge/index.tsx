"use client";

import { ChangeOut } from "@/utils/until";
import React from "react";

interface Type {
  type: "APPLICATION" | "EARLY_RETURN";
}

const OutBedge: React.FC<Type> = ({ type }) => {
  const typeStyle = () => {
    if (type === "APPLICATION") {
      return ` bg-primary-600`;
    } else if (type === "EARLY_RETURN") {
      return `bg-secondary-600`;
    }
  };
  return (
    <div
      className={`${typeStyle()} text-white rounded text-label2 px-1 items-center justify-center h-6 flex`}
    >
      {ChangeOut(type)}
    </div>
  );
};

export default OutBedge;
