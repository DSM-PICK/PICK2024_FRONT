import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const Header: NextPage = ({}) => {
  const teacher = "이기혁";

  return (
    <div className=" flex px-70 justify-between items-center bg-white py-2">
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
