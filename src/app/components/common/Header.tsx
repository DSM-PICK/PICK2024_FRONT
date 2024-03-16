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

  return (
    <div className=" flex px-70 justify-between items-center bg-white py-2">
      <Link href={"/main"}>
        <div className=" font-sans text-heading4 text-primary-300">
          <Image src={pick} alt="" />
        </div>
      </Link>
      <div className=" font-sans w-fit text-heading6-M text-neutral-50">
        {data?.name} 선생님
      </div>
    </div>
  );
};

export default Header;
