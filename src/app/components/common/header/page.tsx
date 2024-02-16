import { NextPage } from "next";
import Link from "next/link";
import React from "react";

interface HeaderProp {
  teacher: string;
}

const Header: React.FC<HeaderProp> = ({ teacher }) => {
  return (
    <div className=" flex px-70 justify-between items-center bg-white">
      <Link href={"/main"}>
        <div className=" font-sans text-heading4 text-primary-300">PiCK</div>
      </Link>
      <div className=" font-sans text-heading6-M text-neutral-50">
        {teacher} 선생님
      </div>
    </div>
  );
};

export default Header;
