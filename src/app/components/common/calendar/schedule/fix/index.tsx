import { useState, useRef, useEffect } from "react";

const ScheduleFix = () => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOptions = () => {
    setOptionsVisible(!isOptionsVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOptionsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative group cursor-grab" onClick={toggleOptions}>
      <div className="group flex flex-col gap-0.5">
        <div className="rounded-full w-1 h-1 bg-neutral-400"></div>
        <div className="rounded-full w-1 h-1 bg-neutral-400"></div>
        <div className="rounded-full w-1 h-1 bg-neutral-400"></div>
      </div>
      {isOptionsVisible && (
        <div className="bg-white rounded w-16 shadow-lg text-caption3 absolute right-0 text-nowrap">
          <div className=" flex p-1">수정하기</div>
          <div className="flex p-1">삭제하기</div>
        </div>
      )}
    </div>
  );
};

export default ScheduleFix;
