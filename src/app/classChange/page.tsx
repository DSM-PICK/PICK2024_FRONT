"use client";
import { getFullToday } from "@/utils/date";
import { BackGround } from "../components/common/background";
import { AcceptClass, AcceptClassChange } from "@/apis/changeClass";
import Dropdown from "../components/common/dropdown";
import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import { useRouter } from "next/navigation";
import ChangeClass from "../components/common/list/changeClass/page";
import { getStudentString } from "@/utils/until";
import Modal from "../components/common/modal/page";
import useAcceptListSelection from "@/hook/hook";

interface FloorClass {
  id: string;
  class_num: number;
  classroom_name: string;
  end_period: number;
  grade: number;
  move: string;
  num: number;
  start_period: number;
  username: string;
}

const ClassChange = () => {
  const [selectedFloor, setSelectedFloor] = useState<number>(5);
  const [data, setData] = useState<FloorClass[]>([]);
  const [accept, setAccept] = useState<boolean>(false);
  const [refuse, setRefuse] = useState<boolean>(false);
  const { selectedStudents, selectedStudentName, handleAcceptListClick } =
    useAcceptListSelection();

  const { mutate: AccpetMutate } = AcceptClassChange();
  const { mutate: AccpetList } = AcceptClass();

  const Accept = () => {
    if (selectedStudents.length === 0) {
      alert("교실 수락 할 학생을 선택해주세요");
    } else setAccept(true);
  };

  const Refuse = () => {
    if (selectedStudents.length === 0) {
      alert("교실 거절 할 학생을 선택해주세요");
    } else setRefuse(true);
  };

  const Accpet = async () => {
    try {
      await AccpetMutate(
        { floor: selectedFloor },
        {
          onSuccess: (data) => {
            setData(data);
          },
          onError: (error) => {
            alert(error.name);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const acceptColor = () => {
    if (selectedStudents.length === 0) {
      return "solidDisabled";
    }
    return "primary";
  };

  const refuseColor = () => {
    if (selectedStudents.length === 0) {
      return "ghostDisabled";
    }
    return "ghost";
  };

  const nav = useRouter();

  useEffect(() => {
    Accpet();
  }, [selectedFloor]);

  const handleFloorChange = (selectedOption: number) => {
    setSelectedFloor(selectedOption);
  };

  const closeModal = () => {
    setRefuse(false);
  };

  const AcceptrCancel = () => {
    setAccept(false);
  };

  const confirmReturn = async () => {
    try {
      await AccpetList(
        { status: "NO", id: selectedStudents },
        {
          onSuccess: () => {
            location.reload();
            alert("교실이동이 거절되었습니다.");
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const Acceptconfirm = async () => {
    try {
      await AccpetList(
        { status: "OK", id: selectedStudents },
        {
          onSuccess: () => {
            location.reload();
            alert("교실이동이 수락되었습니다");
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BackGround
      subTitle="교실 이동 수락"
      secondTitle={getFullToday()}
      linkChildren="교실 이동"
      DropChildren={
        <>
          <div className="flex gap-5 items-center">
            <Button
              colorType="ghost"
              buttonSize="small"
              onClick={() => {
                nav.push("/classChange/ok");
              }}
            >
              교실 이동 보기
            </Button>
            <Dropdown type="floor" onChange={handleFloorChange} />
          </div>
        </>
      }
    >
      {data?.map((item, index) => (
        <ChangeClass
          type="accept"
          key={index}
          onClick={() => handleAcceptListClick(item.id, item.username)}
          prevClass={item.move}
          nextClass={`${item.classroom_name}`}
          student={getStudentString(item)}
        />
      ))}
      <div className=" flex gap-5 w-full justify-end">
        <Button
          colorType={refuseColor()}
          buttonSize="medium"
          onClick={() => {
            Refuse();
          }}
        >
          거절하기
        </Button>
        <Button
          colorType={acceptColor()}
          buttonSize="medium"
          onClick={() => {
            Accept();
          }}
        >
          수락하기
        </Button>
      </div>
      {refuse && (
        <Modal
          heading1={`${
            selectedStudentName.length > 1
              ? `${selectedStudentName[0]} 학생 외 ${
                  selectedStudentName.length - 1
                }명`
              : selectedStudentName.length === 1
              ? `${selectedStudentName[0]} 학생`
              : ""
          }`}
          heading2={`교실이동을 거절하시겠습니까?`}
          type="error"
          buttonMessage="거절"
          onCancel={closeModal}
          onConfirm={confirmReturn}
        />
      )}
      {accept && (
        <Modal
          heading1={`${
            selectedStudentName.length > 1
              ? `${selectedStudentName[0]} 학생 외 ${
                  selectedStudentName.length - 1
                }명`
              : selectedStudentName.length === 1
              ? `${selectedStudentName[0]} 학생`
              : ""
          }`}
          heading2={`교실이동을 수락하시겠습니까?`}
          type="button"
          buttonMessage="수락"
          onCancel={AcceptrCancel}
          onConfirm={Acceptconfirm}
        />
      )}
    </BackGround>
  );
};

export default ClassChange;
