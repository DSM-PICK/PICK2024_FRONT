"use client";

import { useState } from "react";

interface TabProps {
  firstChildren: string;
  secondChildren: string;
  onClick: (tab: string) => void;
}

const AfterTab: React.FC<TabProps> = ({
  firstChildren,
  secondChildren,
  onClick,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>(`${secondChildren}`);

  const selectTabClass = (tab: string) =>
    selectedTab === tab
      ? "font-sans rounded-60 text-heading6-M text-white bg-primary-500  py-3 flex items-center justify-center select-none"
      : "font-sans text-heading6-M bg-white  py-3 flex items-center justify-center select-none";

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    onClick(tab);
  };

  return (
    <div className="flex">
      <div
        className={`${selectTabClass(`${firstChildren}`)} w-38`}
        onClick={() =>
          selectedTab !== `${firstChildren}`
            ? handleTabClick(`${firstChildren}`)
            : null
        }
      >
        {firstChildren}
      </div>
      <div
        className={`${selectTabClass(`${secondChildren}`)} w-32`}
        onClick={() =>
          selectedTab !== secondChildren
            ? handleTabClick(`${secondChildren}`)
            : null
        }
      >
        {secondChildren}
      </div>
    </div>
  );
};

export default AfterTab;
