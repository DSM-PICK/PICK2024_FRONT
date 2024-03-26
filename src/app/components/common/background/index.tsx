"use client";
import React from "react";
import Header from "../Header";
import Link from "next/link";

interface Prop {
  linkChildren: React.ReactNode;
  children: React.ReactNode;
  subTitle: React.ReactNode;
  secondTitle: React.ReactNode;
  DropChildren: React.ReactNode;
}

export const BackGround: React.FC<Prop> = ({
  children,
  linkChildren,
  subTitle,
  secondTitle,
  DropChildren,
}) => {
  return (
    <div className=" whitespace-nowrap h-dvh flex flex-col">
      <Header />
      <div className="flex flex-col gap-7 p-8 py-12 self-center w-3/5 h-90dvh">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; {linkChildren}
        </div>
        <div className="flex justify-between">
          <div className="flex font-sans text-heading4 text-gray-900 gap-4 items-center">
            {subTitle}
            <div className="text-neutral-200 text-heading5">{secondTitle}</div>
          </div>
          <div className="flex items-center gap-5">{DropChildren}</div>
        </div>
        <div className=" w-auto content-between rounded-xl bg-primary-1200 h-140 px-10 py-10 overflow-y-scroll scrollbar-hide flex flex-wrap gap-x-16 gap-y-5">
          {children}
        </div>
      </div>
    </div>
  );
};
