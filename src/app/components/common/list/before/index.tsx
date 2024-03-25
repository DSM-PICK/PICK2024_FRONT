"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import arrow from "@/assets/img/Icon/chevron-right.svg";
import downarrow from "@/assets/img/Icon/downarrow.svg";
import { GetPreviousList } from "@/apis/previousList";
import BeforeList from "./list";

interface getProp {
  id: string;
  userName: string;
}

interface Type {
  username: string;
  application_story: {
    reason: string;
    start_time: string;
    end_time: string;
    date: string;
    type: "APPLICATION" | "EARLY_RETURN";
  }[];
}

const PreviousList: React.FC<getProp> = ({ id, userName }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const { mutate: getPrevious } = GetPreviousList();
  const [data, setData] = useState<Type>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = async () => {
    setIsDropdownVisible(!isDropdownVisible);
    try {
      const result = await getPrevious(
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
    <div className="flex h-13">
      <div className="relative h-5">
        <div
          className="group w-77 whitespace-nowrap gap-4 py-4 px-6 rounded-lg cursor-pointer flex items-center justify-between bg-white"
          onClick={toggleDropdown}
        >
          {userName}
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
                <div className="text-heading6-M ">
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
