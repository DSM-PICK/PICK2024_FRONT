import Link from "next/link";
import Header from "../../Header";
import React from "react";

interface Prop {
  linkChildren: React.ReactNode;
  subTitle: React.ReactNode;
  secondTitle?: React.ReactNode;
  DropChildren: React.ReactNode;
  children?: React.ReactNode;
}

const TopBack: React.FC<Prop> = ({
  linkChildren,
  subTitle,
  secondTitle,
  DropChildren,
  children,
}) => {
  return (
    <div className=" h-dvh flex flex-col">
      <Header />
      <div className=" min-w-min flex flex-col gap-7 p-8 py-12 self-center w-3/5 h-90dvh">
        <div className=" whitespace-nowrap text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt; {linkChildren}
        </div>
        <div className=" whitespace-nowrap flex justify-between items-end gap-6">
          <div className=" whitespace-nowrap flex text-heading4 text-gray-900 gap-4 items-center">
            {subTitle}
            <div className=" whitespace-nowrap text-neutral-200 text-heading5">
              {secondTitle}
            </div>
          </div>
          <div className=" whitespace-nowrap flex items-center gap-5 flex-wrap justify-end">
            {DropChildren}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default TopBack;
