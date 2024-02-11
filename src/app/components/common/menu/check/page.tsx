import { StaticImageData } from "next/image";
import Button from "../../button/page";
import Image from "next/image";

interface CheckProps {
  img: StaticImageData;
  buttonChildren: string;
  onClick: () => void;
  color: "primary" | "secondary" | "tertiary";
  contentChildren: string;
}

const CheckPage: React.FC<CheckProps> = ({
  img,
  buttonChildren,
  onClick,
  color,
  contentChildren,
}) => {
  const children = () => {
    switch (color) {
      case "primary":
        return (
          <div className=" text-center">
            {contentChildren}
            학생은 <br /> 총
            <span className={`text-${color}-500`}> {/*api*/ 4}명</span>
            입니다.
          </div>
        );
      case "secondary":
        return (
          <div className=" text-center">
            {contentChildren} <br /> 학생은 총
            <span className={`text-${color}-500`}> {/*api*/ 4}명</span>입니다.
          </div>
        );
      case "tertiary":
        return (
          <div className=" text-center">
            {contentChildren} <br /> 학생수는 총
            <span className={`text-${color}-500`}> {/*api*/ 4}명</span>입니다.
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
        children={buttonChildren}
        buttonSize="extraLarge"
        onClick={onClick}
      />
    </div>
  );
};

export default CheckPage;
