"use client";

import Image from "next/image";
import { useState } from "react";
import arrow from "@/assets/img/Icon/chevron-right.svg";
import downarrow from "@/assets/img/Icon/downarrow.svg";

const PreviousList = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  return (
    <>
      <div className="group bg-white left-5 top-5 rounded-lg p-4 text-label1 w-77 flex justify-between">
        <div>{"이름"}</div>
        <Image
          src={isDropdownVisible ? `${arrow.src}` : `${downarrow.src}`}
          width={24}
          height={24}
          alt=""
        />
      </div>
      <BeforeList />
    </>
  );
};

export default PreviousList;