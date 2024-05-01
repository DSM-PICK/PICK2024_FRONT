"use client";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import pick from "@/assets/img/Icon/pickname.svg";
import { useRouter } from "next/navigation";
import { cookie } from "@/utils/auth";

const Header: NextPage = ({}) => {
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

  const logout = () => {
    const temp = confirm("로그아웃 하시겠습니까?");
    if (temp) {
      cookie.remove("access_token");
      cookie.remove("refresh_token");
      router.push("/login");
    }
  };

  return (
    <div className="flex px-70 justify-between items-center bg-white py-2">
      <Link href={"/main"}>
        <Image src={pick} alt="" width={96} height={52} />
      </Link>
      <div
        className="flex text-nowrap w-36 text-heading6-M text-neutral-50 cursor-pointer"
        onClick={() => {
          logout();
        }}
      >
        {teacherName ? `${teacherName}선생님` : "선생님"}
      </div>
    </div>
  );
};
export default Header;
