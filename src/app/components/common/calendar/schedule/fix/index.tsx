"use client";
import { Delete } from "@/apis/notice";
import React, { useState, useRef, useEffect } from "react";

interface id {
  id: string;
}

const ScheduleFix: React.FC<id> = ({ id }) => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { mutate: DeleteMutate } = Delete();

  const toggleOptions = () => {
    setOptionsVisible(!isOptionsVisible);
  };

  const deleteNotice = async () => {
    try {
      await DeleteMutate(
        { noticeId: id },
        {
          onSuccess: () => {
            alert("공지가 삭제되었습니다");
          },
          onError: (error) => {
            alert(error.name);
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
          <div className="flex p-1" onClick={deleteNotice}>
            삭제하기
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleFix;
