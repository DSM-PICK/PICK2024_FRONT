import React from "react";
import Button from "../button/page";

interface ModalProps {
  heading1: string;
  heading2: string;
  type: "button" | "input" | "error";
  buttonMessage: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({
  heading1,
  heading2,
  type,
  buttonMessage,
  onCancel,
  onConfirm,
}) => {
  const renderButtons = () => {
    return (
      <div className="flex gap-6">
        <Button
          colorType="ghost"
          children="취소"
          buttonSize="large"
          onClick={onCancel}
        />
        <Button
          colorType={type === "error" ? "red" : "primary"}
          children={buttonMessage}
          buttonSize="large"
          onClick={onConfirm}
        />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-30">
      {type === "button" || type === "error" ? (
        <div className="bg-white rounded-xl px-24 py-13 w-155">
          <div className="flex flex-col gap-8 items-center">
            <div className="font-sans text-heading5 text-neutral-50 text-center">
              <div className=" max-w-none">{heading1}</div>
              <div>{heading2}</div>
            </div>
            <div className="font-sans text-sub-title2-M text-neutral-400 text-center">
              {buttonMessage}하기 선택 이후에는 변경할 수 없습니다. <br /> 다시
              한번 확인해주세요.
            </div>
            {renderButtons()}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Modal;
