"use client";
import React from "react";
import TopBack from "./top";

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
    <TopBack
      linkChildren={linkChildren}
      subTitle={subTitle}
      secondTitle={secondTitle}
      DropChildren={DropChildren}
    >
      <div className=" w-auto content-between rounded-xl bg-primary-1200 h-140 px-10 py-10 overflow-y-scroll scrollbar-hide flex flex-wrap gap-x-16 gap-y-5">
        {children}
      </div>
    </TopBack>
  );
};
