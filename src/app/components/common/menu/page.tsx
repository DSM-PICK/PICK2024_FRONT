import { NextPage } from "next";
import React from "react";
import { StaticImageData } from "next/image";
import Link from "next/link";

interface MenuProp {
  icon: StaticImageData;
  children: string;
  href: string;
}

const Menu: React.FC<MenuProp> = ({ icon, children, href }) => {
  const childrenStyle = ` ${
    children.length < 7
      ? "text-sub-title1-M w-28 flex justify-center items-center"
      : "text-sub-title4-M w-32 h-8 flex justify-center items-center"
  }`;
  return (
    <Link href={href !== undefined ? href : "main"}>
      <div className=" flex flex-col justify-between items-center gap-3">
        <div className=" w-29 h-29 flex items-center justify-center bg-white rounded-xl">
          {icon && <img src={icon.src} />}
        </div>
        <div className={` ${childrenStyle}  text-neutral-50`}>{children}</div>
      </div>
    </Link>
  );
};

export default Menu;
