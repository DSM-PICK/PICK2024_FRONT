import Image from "next/image";
import React from "react";
import nextArrow from "@/assets/img/Icon/arrow-narrow-right.svg";

interface changeClassProp {
  student: string;
  prevClass: string;
  nextClass: string;
}
const ChangeClass: React.FC<changeClassProp> = ({
  student,
  prevClass,
  nextClass,
}) => {
  return (
    <div className=" whitespace-nowrap rounded-lg justify-between flex bg-white gap-10 w-max px-6 py-5">
      <div className=" text-Button-L text-neutral-50">{student}</div>
      <div className=" flex gap-4 text-Button-L text-neutral-50">
        {prevClass}
        <Image src={nextArrow} alt=""></Image>
        {nextClass}
      </div>
    </div>
  );
};

export default ChangeClass;
