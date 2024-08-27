"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import arrow from "@/assets/img/Icon/chevron-right.svg";
import downarrow from "@/assets/img/Icon/downarrow.svg";
import { GetPreviousList, PreviousType } from "@/apis/previousList";
import BeforeList from "./list";
import OutBedge from "./badge";

interface getProp {
  id: string;
  userName: string;
  APPLICATION: number;
  EARLY_RETURN: number;
}

interface Type {
  username: string;
  application_story: {
    reason: string;
    start: string;
    end: string;
    date: string;
    type: "APPLICATION" | "EARLY_RETURN";
  }[];
}

const PreviousList: React.FC<getProp> = ({
  id,
  userName,
  APPLICATION,
  EARLY_RETURN,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const { mutate: getPrevious } = GetPreviousList();
  const [data, setData] = useState<PreviousType>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = async () => {
    setIsDropdownVisible(!isDropdownVisible);
    try {
      await getPrevious(
        { id: id },
        {
          onSuccess: (data) => {
            setData(data);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-fit w-29%">
      <div className="relative w-full">
        <div
          className="group whitespace-nowrap gap-4 py-4 px-6 rounded-lg cursor-pointer flex items-center justify-between bg-white w-max"
          onClick={toggleDropdown}
        >
          <div className=" flex flex-col text-label1 gap-3">
            <div>{userName}</div>
            <div className=" flex items-center gap-3">
              <div className=" flex gap-2 items-center">
                <OutBedge type="APPLICATION" />
                <div className=" flex text-label2">{APPLICATION}회</div>
              </div>
              <div className=" flex gap-2 items-center">
                <OutBedge type="EARLY_RETURN" />
                <div className=" flex text-label2">{EARLY_RETURN}회</div>
              </div>
            </div>
          </div>
          <Image
            src={isDropdownVisible ? `${downarrow.src}` : `${arrow.src}`}
            alt="arrow"
            width={16}
            height={16}
          />
        </div>
        {isDropdownVisible && (
          <div
            className="absolute bg-white border rounded-lg w-full text-Button-S z-20 h-56 flex-col items-center flex overflow-y-scroll scrollbar-hide"
            ref={dropdownRef}
          >
            {data && data.application_story.length > 0 ? (
              data.application_story.map((item, index) => (
                <BeforeList
                  key={index}
                  title={item.reason}
                  date={item.date}
                  startTime={item.start_time}
                  endTime={item.end_time}
                  type={item.type}
                />
              ))
            ) : (
              <div className=" flex justify-center items-center w-full h-full">
                <div className=" text-sub-title3-M">
                  이전 외출 기록이 없습니다
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousList;
