"use client";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import Header from "../components/common/Header";
import Button from "../components/common/Button";

const NotDevelop: NextPage = () => {
  const router = useRouter();

  const onClickBtn = () => {
    router.push("/main");
  };

  return (
    <div className=" flex flex-col">
      <Header />
      <div className=" w-full h-90dvh text-heading5 flex flex-col justify-center items-center gap-4">
        아직 개발중인 페이지입니다
        <Button
          colorType="primary"
          buttonSize="extraLarge"
          onClick={onClickBtn}
        >
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
};

export default NotDevelop;
