"use client";
import { NextPage } from "next";
import { QueryClient, QueryClientProvider } from "react-query";
import Input from "../components/common/input";
import Button from "../components/common/Button";
import Picklogo from "../../assets/img/Icon/pickname.svg";
import { useLogin } from "@/apis/login/login";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "@/utils/auth";

interface ChangeProps {
  text: string;
  name: string;
}

interface LoginType {
  admin_id: string;
  password: string;
}

const queryClient = new QueryClient();

const Login: NextPage = () => {
  const [data, setData] = useState<LoginType>({
    admin_id: "",
    password: "",
  });

  const handleChange = ({ text, name }: ChangeProps) => {
    setData({ ...data, [name]: text });
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClickBtn();
    }
  };

  const { mutate: loginMutate } = useLogin();
  const router = useRouter();

  const onClickBtn = async () => {
    try {
      const result = await loginMutate(data, {
        onSuccess: (res) => {
          const accessToken = res.access_token;
          const refreshToken = res.refresh_token;
          router.push("/main");
          saveToken(accessToken, refreshToken);
        },
        onError: (error) => {
          console.error("Login error:", error);
          router.push("/login");
        },
      });
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      router.push("/login");
    }
  };

  const BtnColor = () => {
    if (data.admin_id === "" || data.password === "") {
      return "solidDisabled";
    } else return "primary";
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className=" font-sans flex justify-center items-center gap-6 bg-primary-1200 p-sign h-lvh">
        <div className=" flex flex-col gap-10 px-44 bg-white rounded-xl h-  p-44">
          <div className=" font-sans text-heading5 text-primary-100">
            로그인
          </div>
          <div className=" flex flex-col items-center gap-29">
            <div className=" flex flex-col items-center gap-8">
              <Input
                type="text"
                width="92"
                label="아이디"
                placeholder="아이디"
                onChange={handleChange}
                value={data.admin_id}
                onKeyDown={handleKeyDown}
                name="admin_id"
              />
              <div className="flex flex-col gap-6">
                <Input
                  type="password"
                  width="92"
                  label="비밀번호"
                  placeholder="비밀번호"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  name="password"
                  value={data.password}
                />
              </div>
            </div>
            <Button
              colorType={`${BtnColor()}`}
              buttonSize="full"
              onClick={onClickBtn}
            >
              로그인
            </Button>
          </div>
        </div>
        <div className=" w-100 h- rounded-xl bg-sideImg">
          <div className=" rounded-xl py-12 px-13 h-full bg-primary-1000 backdrop-blur-sm bg-opacity-30 bg-blur-md">
            <div className="font-sans flex gap-3.5 text-heading6-M text-white">
              {Picklogo && <img src={Picklogo.src} width={110} height={60} />}
            </div>
            <div className=" text-heading1 -space-y-5">
              <div className=" text-white">Welcome</div>
              <div className=" text-primary-500">PiCK</div>
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Login;
