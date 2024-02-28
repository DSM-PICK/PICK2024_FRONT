import { NextPage } from "next";
import Image from "next/image";
import React from "react";
import pick from "@/assets/img/Icon/pick.svg";

interface HeaderProp {
  teacher: string;
}

const Header: React.FC<HeaderProp> = ({ teacher }) => {
  return (
    <div className=" flex px-70 justify-between items-center bg-white">
      <div className=" font-sans text-heading4 text-primary-300">
        <Image src={pick} alt="" />
      </div>
      <div className=" font-sans text-heading6-M text-neutral-50">
        {teacher} 선생님
      </div>
    </div>
  );
};

export default Header;
