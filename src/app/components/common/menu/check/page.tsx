"use client";
import { StaticImageData } from "next/image";
import Button from "../../Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CheckProps {
  img: StaticImageData;
  buttonChildren: string;
  color: "primary" | "secondary" | "tertiary";
  contentChildren: string;
  href: string;
  number?: number;
}

const CheckPage: React.FC<CheckProps> = ({
  img,
  href,
  buttonChildren,
  color,
  contentChildren,
  number,
}) => {
  const router = useRouter();

  const children = () => {
    switch (color) {
      case "primary":
        return (
          <div className=" text-center">
            {contentChildren}
            학생은 <br /> 총<b className="text-primary-500"> {number}명</b>
            입니다.
          </div>
        );
      case "secondary":
        return (
          <div className=" text-center">
            {contentChildren} <br /> 학생은 총
            <b className="text-secondary-500"> {number}명</b>
            입니다.
          </div>
        );
      case "tertiary":
        return (
          <div className=" text-center">
            {contentChildren} <br /> 학생수는 총
            <b className="text-tertiary-500"> {number}명</b>
            입니다.
          </div>
        );
      default:
        return "";
    }
  };

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
