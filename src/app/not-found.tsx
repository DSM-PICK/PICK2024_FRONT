"use client";
import { useRouter } from "next/navigation";
import Button from "./components/common/Button";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className=" text-heading5">404 NOT FOUND</h1>
      <p className="text-lg mb-4">존재하지 않는 페이지입니다</p>
      <Button
        colorType="primary"
        buttonSize="extraLarge"
        onClick={() => router.push("/main")}
      >
        홈으로 돌아가기
      </Button>
    </div>
  );
};

export default NotFound;
