"use client";
import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import Dropdown from "../components/common/dropdown";
import AfterTab from "../components/common/tab/after/page";
import Modal from "../components/common/modal/page";
import AfterDelete from "../components/common/list/after/delete/page";
import { useRouter } from "next/navigation";
import { BackGround } from "../components/common/background";
import { FixStatus, GetAfterStudent } from "@/apis/afterManage";
import { PostStudent } from "@/apis/afterManage";
import CheckList from "../components/common/list/after/check/page";

interface changeClass {
  id: string;
  grade: number;
  class_num: number;
  num: number;
  name: string;
  status1: string;
  status2: string;
  status3: string;
}

interface ChangeStatus {
  id: string;
  status_list: string[];
}

const AfterManage = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [saveModal, setSaveModal] = useState<boolean>(false);
  const { mutate: getafterMutate } = GetAfterStudent();
  const { mutate: postStudents } = PostStudent();
  const [datalist, setDatalist] = useState<changeClass[]>();
  const router = useRouter();
  const { mutate: ChangeStatus } = FixStatus();
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedStudentName, setSelectedStudentName] = useState<string[]>([]);

  const handleAcceptListClick = (id: string, name: string) => {
    const selectedIndex = selectedStudents.indexOf(id);

    const isSelected = selectedIndex !== -1;
    if (isSelected) {
      setSelectedStudents((prevSelectedStudents) =>
        prevSelectedStudents.filter((studentId) => studentId !== id)
      );
      setSelectedStudentName((prevSelectedStudentName) =>
        prevSelectedStudentName.filter((studentName) => studentName !== name)
      );
    } else {
      setSelectedStudents((prevSelectedStudents) => [
        ...prevSelectedStudents,
        id,
      ]);
      setSelectedStudentName((prevSelectedStudentName) => [
        ...prevSelectedStudentName,
        name,
      ]);
    }
  };

  const get = async () => {
    try {
      await getafterMutate(null, {
        onSuccess: (data) => {
          setDatalist(data);
        },
        onError: (error) => {
          console.log(error.name);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onClickEdit = () => {
    setEdit(true);
  };

  const onClickSave = () => {
    setSaveModal(true);
    setEdit(false);
  };

  const onClickChange = () => {
    setChange(!change);
  };

  const onClickAdd = () => {
    setModal(true);
  };

  const handleModalCancel = async () => {
    setModal(false);
    if (typeof window !== "undefined") {
      const localData = localStorage.removeItem("students");
      return localData;
    }
  };

  const [data, setData] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("students");
      return localData ? JSON.parse(localData) : [];
    }
  });

  const handleModalConfirm = async () => {
    setData(() => {
      if (typeof window !== "undefined") {
        const localData = localStorage.getItem("students");
        return localData ? JSON.parse(localData) : [];
      }
      return [];
    });

    const updatedData = data.map((item) => {
      const [studentNum] = item.split(" ");
      return {
        student_num: studentNum,
      };
    });

    console.log(data);
    try {
      await postStudents(updatedData);
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveModalConfirm = async () => {
    const updatedData: ChangeStatus[] = [];
    datalist?.forEach((item) => {
      const localData = localStorage.getItem(item.id);
      console.log(localData);
      if (localData) {
        const parsedData = JSON.parse(localData);
        console.log(parsedData);
        const studentData = {
          id: item.id,
          status_list: [parsedData[0], parsedData[1], parsedData[2]],
        };
        updatedData.push(studentData);
      }
    });

    try {
      await ChangeStatus(updatedData, {
        onSuccess: () => {
          location.reload();
        },
        onError: (error) => {
          alert(error.name);
        },
      });
    } catch (error) {
      console.log(error);
    }
    setSaveModal(false);
  };

  const handleSaveModalCancel = () => {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.includes("-")) {
        localStorage.removeItem(key);
      }
    });
    setSaveModal(false);
  };

  const threeStyle =
    " bg-white flex justify-center items-center whitespace-nowrap text-label1 rounded-lg w-1/3";

  const onClickBtn = () => {
    router.push("/main");
  };

  useEffect(() => {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.includes("-")) {
        localStorage.removeItem(key);
      }
    });
    get();
  }, []);

  return (
    <BackGround
      secondTitle={
        <AfterTab
          firstChildren="전공동아리"
          secondChildren="방과후"
          onClick={onClickChange}
        ></AfterTab>
      }
      subTitle="방과후 관리"
      linkChildren="방과후 관리"
      DropChildren={
        <>
          {change ? (
            <div className="flex items-center gap-5 flex-wrap justify-end">
              {edit ? (
                <Button
                  colorType="ghost"
                  buttonSize="small"
                  onClick={onClickSave}
                >
                  출결 저장하기
                </Button>
              ) : (
                <Button
                  colorType="ghost"
                  buttonSize="small"
                  onClick={onClickEdit}
                >
                  출결 체크하기
                </Button>
              )}
              <div className=" flex gap-2">
                <Dropdown type="floor" />
                <Dropdown type="club" />
              </div>
            </div>
          ) : (
            <div className=" flex gap-4">
              <Button colorType="ghost" buttonSize="small" onClick={onClickAdd}>
                인원추가하기
              </Button>
              {edit ? (
                <Button
                  colorType="ghost"
                  buttonSize="small"
                  onClick={onClickSave}
                >
                  출결저장하기
                </Button>
              ) : (
                <Button
                  colorType="ghost"
                  buttonSize="small"
                  onClick={onClickEdit}
                >
                  출결 체크하기
                </Button>
              )}
            </div>
          )}
        </>
      }
    >
      <>
        {change ? (
          <div className=" w-full h-full text-heading5 flex flex-col justify-center items-center gap-4">
            아직 개발중인 페이지입니다
            <Button
              colorType="primary"
              buttonSize="extraLarge"
              onClick={onClickBtn}
            >
              홈으로 돌아가기
            </Button>
          </div>
        ) : (
          <>
            {edit ? (
              <div className=" flex flex-col gap-8 w-full">
                <div className=" flex gap-20">
                  <div className=" text-heading5 justify-center flex text-primary-100 w-29">
                    창조실
                  </div>
                  <div className="flex gap-11 w-full">
                    <div className={threeStyle}>8교시</div>
                    <div className={threeStyle}>9교시</div>
                    <div className={threeStyle}>10교시</div>
                  </div>
                </div>
                <div className=" flex gap-20">
                  <div className=" flex flex-col gap-6">
                    {datalist?.map((item, index) => (
                      <div
                        className="flex w-max bg-white py-4 px-6 rounded-lg text-label1"
                        key={index}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                  <div className=" w-full flex gap-x-11 gap-y-6 flex-wrap content-start">
                    {edit ? (
                      <>
                        {datalist?.map((item, index) => {
                          return (
                            <CheckList
                              id={item.id}
                              state1={item.status1}
                              state2={item.status2}
                              state3={item.status3}
                              onClick={() =>
                                handleAcceptListClick(item.id, item.name)
                              }
                            />
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className=" flex gap-8 flex-col w-full">
                <div className=" text-heading5 text-primary-100">창조실</div>
                <div className=" flex gap-x-13 gap-y-5 flex-wrap w-full">
                  {datalist?.map((item, index) => (
                    <AfterDelete student={item.name} key={index} id={item.id} />
                  ))}
                </div>
              </div>
            )}
            {modal && (
              <Modal
                type="add"
                heading1="창조실 인원추가"
                buttonMessage="추가"
                onCancel={handleModalCancel}
                onConfirm={handleModalConfirm}
              />
            )}
            {saveModal && (
              <Modal
                type="button"
                heading1={`${
                  selectedStudentName.length > 1
                    ? `${selectedStudentName[0]} 학생 외 ${
                        selectedStudentName.length - 1
                      }명`
                    : selectedStudentName.length === 1
                    ? `${selectedStudentName[0]} 학생`
                    : ""
                }`}
                heading2="변경된 상태를 저장하시겠습니까?"
                buttonMessage="확인"
                onCancel={handleSaveModalCancel}
                onConfirm={handleSaveModalConfirm}
              />
            )}
          </>
        )}
      </>
    </BackGround>
  );
};

export default AfterManage;
