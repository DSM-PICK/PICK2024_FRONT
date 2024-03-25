"use client";
import { StaticImageData } from "next/image";
import Button from "../../Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetStudentNum } from "@/apis/main";

interface CheckProps {
  img: StaticImageData;
  buttonChildren: string;
  color: "primary" | "secondary" | "tertiary";
  contentChildren: string;
  href: string;
}

interface Type {
  out: number;
  request: number;
  class_move: number;
}

const CheckPage: React.FC<CheckProps> = ({
  img,
  href,
  buttonChildren,
  color,
  contentChildren,
}) => {
  const router = useRouter();
  const [data, setData] = useState<Type>();
  const { mutate: CountNum } = GetStudentNum();

  const cnt = async () => {
    try {
      await CountNum(null, {
        onSuccess: (data) => {
          setData(data);
        },
        onError: (error) => {
          console.log(error.name);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cnt();
  }, []);

  const children = () => {
    switch (color) {
      case "primary":
        return (
          <div className=" text-center">
            {contentChildren}
            학생은 <br /> 총
            <span className="text-primary-500"> {data?.out}명</span>
            입니다.
          </div>
        );
      case "secondary":
        return (
          <div className=" text-center">
            {contentChildren} <br /> 학생은 총
            <span className="text-secondary-500"> {data?.request}명</span>
            입니다.
          </div>
        );
      case "tertiary":
        return (
          <div className=" text-center">
            {contentChildren} <br /> 학생수는 총
            <span className="text-tertiary-500"> {data?.class_move}명</span>
            입니다.
          </div>
        );
      default:
        return "";
    }
  };

  console.log(data?.class_move);

  return (
    <div className="flex flex-col px-8 pt-14 pb-10 justify-center items-center gap-10">
      <div className="flex flex-wrap justify-center">
        <div className="font-sans text-heading6-M text-neutral-50">
          {children()}
        </div>
      </div>
      <Image src={img} alt="" />
      <Button
        colorType={color}
        buttonSize="extraLarge"
        onClick={() => router.push(href)}
      >
        {buttonChildren}
      </Button>
    </div>
  );
};

export default CheckPage;
