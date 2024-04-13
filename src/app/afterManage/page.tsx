"use client";
import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import Dropdown from "../components/common/dropdown";
import AfterTab from "../components/common/tab/after/page";
import Modal from "../components/common/modal/page";
import AfterDelete from "../components/common/list/after/delete/page";
import { BackGround } from "../components/common/background";
import { FixStatus, GetAfterStudent, GetClubList } from "@/apis/afterManage";
import { PostStudent } from "@/apis/afterManage";
import CheckList from "../components/common/list/after/check/page";
import { CheckStatus } from "@/apis/selfStudy";
import { getStudentString, setStudentNum } from "@/utils/until";
import { getWeekDay } from "@/utils/date";

interface ClubList {
  id: string;
  username: string;
  grade: number;
  class_num: number;
  num: number;
  status6: string;
  status7: string;
  status8: string;
  status9: string;
  status10: string;
}

interface ChangeClass {
  id: string;
  grade: number;
  class_num: number;
  num: number;
  name: string;
  status1: string;
  status2: string;
  status3: string;
}

interface ChangeClub {
  user_id: string;
  status_list: string[];
}

interface ChangeStatus {
  id: string;
  status_list: string[];
}

const AfterManage = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);
  const [dataList, setDataList] = useState<ChangeClass[]>();
  const [saveModal, setSaveModal] = useState<boolean>(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedStudentName, setSelectedStudentName] = useState<string[]>([]);
  const { mutate: getAfterMutate } = GetAfterStudent();
  const { mutate: postStudents } = PostStudent();
  const { mutate: changeStatus } = FixStatus();
  const { mutate: clubMutate } = GetClubList();
  const [clubList, setClubList] = useState<ClubList[]>([]);
  const { mutate: CheckClub } = CheckStatus();
  const [selectClub, setSelectClub] = useState<string>("PiCK");

  const day = getWeekDay();

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

  const getClub = async () => {
    try {
      await clubMutate(
        { club: selectClub },
        {
          onSuccess: (data) => {
            setClubList(data);
          },
          onError: (error) => {
            alert(error.message);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClubChange = (selectedOption: string) => {
    setSelectClub(selectedOption);
  };

  const get = async () => {
    try {
      await getAfterMutate(null, {
        onSuccess: (data) => {
          setDataList(data);
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
    const updatedData = data.map((item) => {
      const [studentNum] = item.split(" ");
      return {
        student_num: studentNum,
      };
    });

    try {
      await postStudents(updatedData, {
        onSuccess: () => {
          alert("추가되었습니다");
          location.reload();
        },
      });
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveClub = async () => {
    const updatedData: ChangeClub[] = [];
    clubList?.forEach((item) => {
      const localData = localStorage.getItem(item.id);
      if (localData) {
        const parsedData = JSON.parse(localData);
        const studentData = {
          user_id: item.id,
          status_list: [
            parsedData[0],
            parsedData[1],
            parsedData[2],
            parsedData[3] || "ATTENDANCE",
            parsedData[4] || "ATTENDANCE",
          ],
        };
        updatedData.push(studentData);
      }
    });

    try {
      await CheckClub(updatedData, {
        onSuccess: () => {
          alert("상태가 변경되었습니다");
        },
        onError: (error) => {
          alert(error.name);
        },
      });

      updatedData.forEach((item) => {
        localStorage.setItem(item.user_id, JSON.stringify(item.status_list));
      });
    } catch (error) {
      console.log(error);
    }
    setSaveModal(false);
  };

  const handleSaveModalConfirm = async () => {
    const updatedData: ChangeStatus[] = [];
    dataList?.forEach((item) => {
      const localData = localStorage.getItem(item.id);
      if (localData) {
        const parsedData = JSON.parse(localData);
        const studentData = {
          id: item.id,
          status_list: [parsedData[0], parsedData[1], parsedData[2]],
        };
        updatedData.push(studentData);
      }
    });

    try {
      await changeStatus(updatedData, {
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
    " bg-white flex justify-center items-center whitespace-nowrap text-label1 rounded-lg w-29% gap-11";

  useEffect(() => {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.includes("-")) {
        localStorage.removeItem(key);
      }
    });
    get();
    getClub();
  }, []);

  useEffect(() => {
    getClub();
  }, [selectClub]);

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
                <Dropdown type="club" onChange={handleClubChange} />
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
          <div className=" flex flex-col gap-8 w-full">
            <div className=" flex gap-20">
              <div className=" text-heading5 justify-center flex text-primary-100 w-40 whitespace-nowrap">
                {selectClub}
              </div>

              {day === "금" ? (
                <div className="flex justify-between w-full gap-11">
                  <div className={threeStyle}>6교시</div>
                  <div className={threeStyle}>7교시</div>
                  <div className={threeStyle}>8교시</div>
                  <div className={threeStyle}>9교시</div>
                  <div className={threeStyle}>10교시</div>
                </div>
              ) : (
                <div className="flex justify-between w-full">
                  <div className={threeStyle}>8교시</div>
                  <div className={threeStyle}>9교시</div>
                  <div className={threeStyle}>10교시</div>
                </div>
              )}
            </div>
            <div className=" flex gap-20">
              <div className=" flex flex-col gap-6">
                {clubList?.map((item, index) => (
                  <div
                    className="flex w-32 bg-white h-14 items-center justify-center rounded-lg text-label1"
                    key={index}
                  >
                    {getStudentString(item)}
                  </div>
                ))}
              </div>
              <div className=" w-full flex gap-x-11 gap-y-6 flex-wrap content-start">
                {edit ? (
                  <>
                    {day === "금"
                      ? clubList?.map((item, index) => {
                          return (
                            <CheckList
                              key={index}
                              id={item.id}
                              state1={item.status6}
                              state2={item.status7}
                              state3={item.status8}
                              state4={item.status9}
                              state5={item.status10}
                              onClick={() =>
                                handleAcceptListClick(item.id, item.username)
                              }
                            />
                          );
                        })
                      : clubList?.map((item, index) => {
                          return (
                            <CheckList
                              key={index}
                              id={item.id}
                              state1={item.status6}
                              state2={item.status7}
                              state3={item.status8}
                              onClick={() =>
                                handleAcceptListClick(item.id, item.username)
                              }
                            />
                          );
                        })}
                  </>
                ) : (
                  <>
                    {day === "금"
                      ? clubList?.map((item, index) => {
                          return (
                            <CheckList
                              key={index}
                              id={item.id}
                              state1={item.status6}
                              state2={item.status7}
                              state3={item.status8}
                              state4={item.status9}
                              state5={item.status10}
                              onClick={() =>
                                handleAcceptListClick(item.id, item.username)
                              }
                              type="NO"
                            />
                          );
                        })
                      : clubList?.map((item, index) => {
                          return (
                            <CheckList
                              key={index}
                              id={item.id}
                              state1={item.status6}
                              state2={item.status7}
                              state3={item.status8}
                              onClick={() =>
                                handleAcceptListClick(item.id, item.username)
                              }
                              type="NO"
                            />
                          );
                        })}
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            {edit ? (
              <div className=" flex flex-col gap-8 w-full">
                <div className=" flex gap-20">
                  <div className=" text-heading5 justify-center flex text-primary-100 w-40">
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
                    {dataList?.map((item, index) => (
                      <div
                        className="flex w-32 bg-white h-14 items-center justify-center rounded-lg text-label1"
                        key={index}
                      >
                        {setStudentNum(item)} {item.name}
                      </div>
                    ))}
                  </div>
                  <div className=" w-full flex gap-x-11 gap-y-6 flex-wrap content-start">
                    {edit ? (
                      <>
                        {dataList?.map((item, index) => {
                          return (
                            <CheckList
                              key={index}
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
                  {dataList?.map((item, index) => (
                    <AfterDelete student={item.name} key={index} id={item.id} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </>
      {modal && (
        <Modal
          type="add"
          heading1="창조실 인원추가"
          buttonMessage="추가"
          onCancel={handleModalCancel}
          onConfirm={handleModalConfirm}
        />
      )}
      {saveModal && change && (
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
          onConfirm={handleSaveClub}
        />
      )}
      {saveModal && !change && (
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
    </BackGround>
  );
};

export default AfterManage;
