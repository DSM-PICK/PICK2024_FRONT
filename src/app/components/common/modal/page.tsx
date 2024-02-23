import React, { useState, useEffect } from "react";
import Button from "../button/page";
import Input from "../input/page";

import moment from "moment";
import { AutoInput } from "../input/auto/page";

interface ChangeProps {
  text: string;
  name: string;
}

interface ModalProps {
  heading1?: string;
  heading2?: string;
  type: "button" | "changeTeacher" | "error" | "addSchedule" | "add";
  buttonMessage: string;
  onCancel: () => void;
  onConfirm: () => void;
  date?: Date | null;
  teachers?: string[] | undefined;
}

const Modal: React.FC<ModalProps> = ({
  heading1,
  heading2,
  type,
  buttonMessage,
  onCancel,
  onConfirm,
  date,
  teachers,
}) => {
  const [teacherData, setTeacherData] = useState<string[]>(teachers || []);
  const [inputValue, setInputValue] = useState("");

  const [addstudent, setAddstudent] = useState({
    student: "",
  });

  useEffect(() => {
    setTeacherData(teachers || []);
  }, [teachers]);

  const [data, setData] = useState({
    second: "",
    third: "",
    fourth: "",
  });

  const [scheduleData, setScheduleData] = useState({
    schedule: "",
  });

  const handleChange = ({ text, name }: ChangeProps) => {
    setData({ ...data, [name]: text });
  };

  const SchehandleChange = ({ text, name }: ChangeProps) => {
    setScheduleData({ ...scheduleData, [name]: text });
  };

  const AutohandleChange = ({ text, name }: ChangeProps) => {
    setAddstudent({ ...addstudent, [name]: text });
    setInputValue(text);
  };

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

  const formetDate = date ? moment(date).format("M월 DD일") : null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-30">
      {type === "button" || type === "error" ? (
        <div className="bg-white rounded-xl px-24 py-13 w-155">
          <div className="flex flex-col gap-8 items-center">
            <div className="font-sans text-heading5 text-neutral-50 text-center">
              {heading1 && <div className="max-w-none">{heading1}</div>}
              {heading2 && <div className=" w-max">{heading2}</div>}
            </div>
            <div className="font-sans text-sub-title2-M text-neutral-400 text-center">
              {buttonMessage}하기 선택 이후에는 변경할 수 없습니다. <br /> 다시
              한번 확인해주세요.
            </div>
            {renderButtons()}
          </div>
        </div>
      ) : (
        (type === "changeTeacher" || type === "addSchedule") && (
          <div className="bg-white rounded-xl px-24 py-13 w-155">
            <div className="flex flex-col gap-8 items-center">
              <div className=" text-neutral-50 text-center">
                {heading1 && (
                  <div className=" flex gap-1 text-heading6-M max-w-none">
                    <div className=" text-primary-400">{formetDate}</div>
                    <div>{heading1}</div>
                  </div>
                )}
              </div>
              {type === "changeTeacher" ? (
                <div className=" flex flex-col gap-4">
                  <Input
                    type="text"
                    label="2층 자습감독"
                    onChange={handleChange}
                    value={data.second}
                    name="second"
                    placeholder="선생님 이름을 입력해주세요."
                    width="92"
                  />
                  <Input
                    type="text"
                    label="3층 자습감독"
                    onChange={handleChange}
                    value={data.third}
                    name="third"
                    placeholder="선생님 이름을 입력해주세요."
                    width="92"
                  />
                  <Input
                    type="text"
                    label="4층 자습감독"
                    onChange={handleChange}
                    value={data.fourth}
                    name="fourth"
                    placeholder="선생님 이름을 입력해주세요."
                    width="92"
                  />
                </div>
              ) : (
                <div>
                  <Input
                    type="text"
                    label="제목*"
                    onChange={SchehandleChange}
                    value={scheduleData.schedule}
                    name="schedule"
                    placeholder="일정제목"
                    width="92"
                  />
                </div>
              )}
              {renderButtons()}
            </div>
          </div>
        )
      )}
      {type === "add" && (
        <div className="bg-white rounded-xl px-24 py-13 w-155">
          <div className="flex flex-col gap-8 items-center">
            <div className=" text-neutral-50 text-center">
              {heading1 && (
                <div className=" flex flex-col gap-9 max-w-none items-center">
                  <div className="text-heading6-M flex gap-2">
                    <div className=" text-purple-400">창조실</div> 인원추가
                  </div>
                  <div className="">
                    <AutoInput
                      placeholder="학번과 이름을 입력하세요"
                      width="92"
                      onChange={AutohandleChange}
                      value={addstudent.student}
                      name="student"
                    />
                  </div>
                  {renderButtons()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
