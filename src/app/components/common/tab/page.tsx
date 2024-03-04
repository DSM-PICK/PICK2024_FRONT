import { useState } from "react";

interface TabProps {
  firstChildren: string;
  secondChildren: string;
  onClick: (tab: boolean) => void;
}

const DoubleTab: React.FC<TabProps> = ({
  firstChildren,
  secondChildren,
  onClick,
}) => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);

  const selectTabClass = (tab: boolean) =>
    selectedTab === tab
      ? "font-sans text-sub-title3-B border border-primary-500 bg-primary-1000 w-38 py-3 flex items-center justify-center select-none"
      : "font-sans text-sub-title3-B border border-neutral-300 bg-white w-38 py-3 flex items-center justify-center select-none";

  const handleTabClick = (tab: boolean) => {
    setSelectedTab(tab);
    onClick(tab);
  };

  return (
    <div className="flex">
      <div
        className={`${selectTabClass(false)} rounded-l-lg`}
        onClick={() => handleTabClick(false)}
      >
        {firstChildren}
      </div>
      <div
        className={`${selectTabClass(true)} rounded-r-lg`}
        onClick={() => handleTabClick(true)}
      >
        {secondChildren}
      </div>
    </div>
  );
};

export default DoubleTab;
