"use client";

import { useState } from "react";

interface TabProps {
  firstChildren: string;
  secondChildren: string;
  onClick: (tab: boolean) => void;
}

const AfterTab: React.FC<TabProps> = ({
  firstChildren,
  secondChildren,
  onClick,
}) => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);

  const selectTabClass = (tab: boolean) =>
    selectedTab === tab
      ? "font-sans rounded-60 text-heading6-M text-white bg-primary-500  py-3 flex items-center justify-center select-none"
      : "font-sans text-heading6-M bg-white  py-3 flex items-center justify-center select-none";

  const handleTabClick = (tab: boolean) => {
    setSelectedTab(tab);
    onClick(tab);
  };

  return (
    <div className="flex">
      <div
        className={`${selectTabClass(false)} w-38`}
        onClick={() => handleTabClick(false)}
      >
        {firstChildren}
      </div>
      <div
        className={`${selectTabClass(true)} w-32`}
        onClick={() => handleTabClick(true)}
      >
        {secondChildren}
      </div>
    </div>
  );
};

export default AfterTab