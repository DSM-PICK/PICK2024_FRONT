"use client";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);
  return <></>;
};
export default Home;
