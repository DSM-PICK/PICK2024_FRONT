"use client";
import React, { useEffect, useState } from "react";
import AfterCheck from "../page";

interface State {
  state1: string;
  state2: string;
  state3: string;
  state4?: string;
  state5?: string;
  id: string;
  onClick?: () => void;
}

const CheckList: React.FC<State> = ({
  state1,
  state2,
  state3,
  state4,
  state5,
  id,
  onClick,
}) => {
  const Change = (item: string) => {
    switch (item) {
      case "ATTENDANCE":
        return "출석";
      case "MOVEMENT":
        return "이동";
      case "GO_OUT":
        return "외출";
      case "DISALLOWED":
        return "무단";
      case "PICNIC":
        return "현체";
      case "EMPLOYMENT":
        return "취업";
      default:
        return "";
    }
  };

  const [statusList, setStatusList] = useState<string[]>([]);

  useEffect(() => {
    setStatusList([state1, state2, state3]);
  }, [state1, state2, state3]);

  useEffect(() => {
    localStorage.setItem(id, JSON.stringify(statusList));
  }, [id, statusList]);

  const handleChange = (index: number, newState: string) => {
    const newStatusList = [...statusList];
    newStatusList[index] = newState;
    setStatusList(newStatusList);
  };

  return (
    <div className="flex w-full gap-11">
      <AfterCheck
        state={Change(state1)}
        onChange={(newState) => {
          handleChange(2, newState);
          if (onClick) onClick();
        }}
      />
      <AfterCheck
        state={Change(state2)}
        onChange={(newState) => {
          handleChange(1, newState);
          if (onClick) onClick();
        }}
      />
      <AfterCheck
        state={Change(state3)}
        onChange={(newState) => {
          handleChange(2, newState);
          if (onClick) onClick();
        }}
      />

      {/* {state4 && <AfterCheck state={Change(state4)} />}
      {state5 && <AfterCheck state={Change(state5)} />} */}
    </div>
  );
};

export default CheckList;
