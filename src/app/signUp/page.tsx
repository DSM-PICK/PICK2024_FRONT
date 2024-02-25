"use client";
import React, { useState } from "react";
import next, { NextPage } from "next/types";
import Image from "next/image";
import Input from "../components/common/input/page";
import Link from "next/link";
import Button from "../components/common/button/page";
import logo from "../../assets/img/Icon/eye.svg";

interface ChangeProps {
  text: string;
  name: string;
}
const SignUp: NextPage = () => {
  const [data, setData] = useState({
    accountID: "",
    password: "",
    rePassword: "",
  });

  const handleChange = ({ text, name }: ChangeProps) => {
    setData({ ...data, [name]: text });
  };
  return (
    <div className=" font-sans flex justify-center items-center gap-6 bg-primary-1200 p-sign h-lvh">
      <div className=" flex flex-col gap-10 px-44 bg-white rounded-xl h-  p-44">
        <div className=" font-sans text-heading5 text-primary-100">
          회원가입
        </div>
        <div className=" flex flex-col items-center gap-29">
          <div className=" flex flex-col items-center gap-8">
            <Input
              type="text"
              width="92"
              label="아이디"
              placeholder="아이디"
              onChange={handleChange}
              value={data.accountID}
              name="accountID"
            />
            <div className="flex flex-col gap-6">
              <Input
                type="password"
                width="92"
                label="비밀번호"
                placeholder="비밀번호"
                onChange={handleChange}
                name="password"
                value={data.password}
              />
              <Input
                type="password"
                width="92"
                placeholder="비밀번호 확인"
                onChange={handleChange}
                name="rePassword"
                value={data.rePassword}
              />
            </div>
            <div className=" font-sans text-label2 text-neutral-50 flex gap-1">
              이미 계정이 있으신가요?
              <Link href={"/login"} className=" text-secondary-500 underline">
                로그인
              </Link>
            </div>
          </div>
          <Button
            children="로그인"
            colorType="solidDisabled"
            buttonSize="full"
            onClick={() => {}}
          />
        </div>
      </div>
      <div className=" w-100 h- rounded-xl bg-sideImg">
        <div className=" rounded-xl py-12 px-13 h-full bg-primary-1000 backdrop-blur-sm bg-opacity-30 bg-blur-md">
          <div className="font-sans flex gap-3.5 text-heading6-M text-white">
            {logo && <img src={logo.src} width={40} height={40} />}PiCK
            {/*임시로 아무 아이콘 넣어둠 */}
          </div>
          <div className=" text-heading1 -space-y-5">
            <div className=" text-white">Welcome</div>
            <div className=" text-primary-500">PiCK</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
