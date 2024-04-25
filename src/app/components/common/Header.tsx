"use client";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import pick from "@/assets/img/Icon/pickname.svg";
import { useRouter } from "next/navigation";

const Header: NextPage = ({}) => {
  const [easterCounter, setEasterCounter] = useState<number>(0);
  const [easterUrl, setEasetUrl] = useState<string>("/main");
  const [teacherName, setTeacherName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("name");
    setTeacherName(name);
  }, []);

  if (teacherName === "영양사") {
    router.push(`/WeekendMeals/all`);
  } else if (teacherName === "지킴이") {
    router.push(`/outList`);
  }

  const instagram = [
    "park._hyun.a",
    "07_.chan",
    "nimeahgnak",
    "dud_wns_13",
    "yook_gijun",
    "s__hyyeon",
    "rudeh.2926",
    "yusungsk",
  ];

  const easterBoolean = false;

  const easterEgg = () => {
    if (easterBoolean) {
      setEasterCounter(easterCounter + 1);
      const randomNumber = Math.floor(Math.random() * instagram.length);
      if (easterCounter > 10)
        setEasetUrl(`https://www.instagram.com/${instagram[randomNumber]}/`);
    }
  };

  return (
    <div className="flex px-70 justify-between items-center bg-white py-2">
      <Link href={easterUrl} onClick={easterEgg}>
        <Image src={pick} alt="" width={96} height={52} />
      </Link>
      <div className="flex text-nowrap w-36 text-heading6-M text-neutral-50">
        {teacherName ? `${teacherName}선생님` : "선생님"}
      </div>
    </div>
  );
};
export default Header;
