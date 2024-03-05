"use client";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import Header from "../components/common/header/page";
import Button from "../components/common/button/page";

const StudentInquiry: NextPage = () => {
  const router = useRouter();

  const onClickBtn = () => {
    router.push("/main");
  };

  return (
    <div className=" flex flex-col">
      <Header />
      <div className=" w-full h-90dvh text-heading5 flex flex-col justify-center items-center">
        아직 개발중인 페이지입니다
        <Button
          colorType="primary"
          children="홈으로돌아가기"
          buttonSize="extraLarge"
          onClick={onClickBtn}
        />
      </div>
    </div>
  );
};

export default StudentInquiry;
