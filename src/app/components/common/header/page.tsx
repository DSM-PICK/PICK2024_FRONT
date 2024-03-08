import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import pick from "@/assets/img/Icon/pick.svg";

const Header: NextPage = ({}) => {
  const teacher = "이기혁";

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
