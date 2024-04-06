"use client";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import pick from "@/assets/img/Icon/pickname.svg";
import { GetTeacherName } from "@/apis/login/login";

interface name {
  name: string;
}

const Header: NextPage = ({}) => {
  const { mutate: getNameMutate } = GetTeacherName();
  const [data, setData] = useState<name>();

  const getName = async () => {
    try {
      const result = await getNameMutate(null, {
        onSuccess: (data) => {
          setData(data);
        },
        onError: (error) => {
          console.log(error.message);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  const [easterCounter, setEasterCounter] = useState<number>(0);
  const [easterUrl, setEasetUrl] = useState<string>("/main");

  const easterEgg = () => {
    setEasterCounter(easterCounter + 1);
    if (easterCounter > 10) setEasetUrl("https://vidkidz.tistory.com/155");
  };

  return (
    <div className=" flex px-70 justify-between items-center bg-white py-2">
      <Link href={easterUrl} onClick={easterEgg}>
        <Image src={pick} alt="" width={96} height={52} />
      </Link>
      <div className="flex font-sans text-nowrap w-36 text-heading6-M text-neutral-50">
        {data?.name}선생님
      </div>
    </div>
  );
};

export default Header;
