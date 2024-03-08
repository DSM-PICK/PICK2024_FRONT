"use client";
import { NextPage } from "next";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import Input from "../components/common/input/page";
import Button from "../components/common/button/page";
import logo from "../../assets/img/Icon/PICK.svg";
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

  const { mutate: loginMutate } = useLogin();
  const router = useRouter();

  const onClickBtn = async () => {
    try {
      const result = await loginMutate(data, {
        onSuccess: (res) => {
          const accessToken = res.access_token;
          const refreshToken = res.refresh_token;
          saveToken(accessToken, refreshToken);

          router.push("/main");
        },
        onError: (error) => {
          console.error("Login error:", error);
        },
      });
    } catch (error) {
      console.error("An unexpected error occurred:", error);
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
                name="admin_id"
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
              </div>
            </div>
            <Button
              children="로그인"
              colorType={`${BtnColor()}`}
              buttonSize="full"
              onClick={onClickBtn}
            />
          </div>
        </div>
        <div className=" w-100 h- rounded-xl bg-sideImg">
          <div className=" rounded-xl py-12 px-13 h-full bg-primary-1000 backdrop-blur-sm bg-opacity-30 bg-blur-md">
            <div className="font-sans flex gap-3.5 text-heading6-M text-white">
              {logo && <img src={logo.src} width={110} height={60} />}
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
