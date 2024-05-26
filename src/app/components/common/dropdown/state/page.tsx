"use client";

import Down from "@/assets/img/Icon/downarrow.svg";
import Image from "next/image";
import React, { useState } from "react";
import arrow from "@/assets/img/Icon/chevron-right.svg";

interface StateDropProps {
  state: "OK" | "NO" | "QUIET";
}

const AllmealDrop: React.FC<StateDropProps> = ({ state }) => {
  const defaultOptions: Record<string, string> = {
    OK: "신청",
    NO: "미신청",
    QUIET: "미응답",
  };

  const [selectedOption, setSelectedOption] = useState<string>(
    defaultOptions[state]
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="relative w-38">
      <div
        className=" border bg-white py-2 px-3 focus:border-primary-200 rounded-lg cursor-pointer flex items-center justify-between"
        onClick={toggleDropdown}
      >
        {selectedOption}
      </div>
    </div>
  );
};

export default AllmealDrop;
