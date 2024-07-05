import React, { useState } from "react";

interface SurveyProp {
  onClick: () => void;
}

const SurveyModal = ({ onClick }: SurveyProp) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      localStorage.setItem("survey", "OK");
    } else {
      localStorage.removeItem("survey");
    }
  };

  return (
    <div className="inset-0 fixed flex items-center justify-center bg-gray-800 bg-opacity-30">
      <div className="z-10 bg-white rounded-xl px-24 py-13 w-155">
        <div className="flex flex-col gap-8 items-center">
          <div className="text-heading5 text-neutral-50 text-center">
            픽 만족도 조사하기
          </div>
          <p className="text-sub-title2-M text-neutral-400 text-center text-nowrap">
            좀 더 좋은 PiCK으로 업데이트를 위해 만족도 조사를 하려고 합니다.
            <br />
            많은 참여 부탁드립니다
          </p>
          <a
            href="https://forms.gle/fAQ9yoNTyQvdY4q59"
            className="text-heading6-M select-none underline text-primary-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            만족도 조사하기
          </a>
        </div>
        <div className="flex items-center gap-1 mt-8 justify-end">
          <div>
            <input
              id="check"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="check" className=" select-none">
              다시 보지 않기
            </label>
          </div>
          <div className="cursor-pointer ml-4" onClick={onClick}>
            닫기
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyModal;
