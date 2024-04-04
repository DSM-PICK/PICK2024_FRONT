"use client";
import { useState } from "react";
import Button from "../components/common/Button";
import Dropdown from "../components/common/dropdown";
import AfterCheck from "../components/common/list/after/page";
import AfterTab from "../components/common/tab/after/page";
import Modal from "../components/common/modal/page";
import AfterDelete from "../components/common/list/after/delete/page";
import { useRouter } from "next/navigation";
import { BackGround } from "../components/common/background";
import { GetAfterStudent } from "@/apis/afterManage";
import { PostStudent } from "@/apis/afterManage";

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

const AfterManage = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [saveModal, setSaveModal] = useState<boolean>(false);
  const { mutate: getafterMutate } = GetAfterStudent();
  const { mutate: postStudents } = PostStudent();
  const [datalist, setDatalist] = useState<changeClass[]>();

  const get = async () => {
    try {
      const resule = await getafterMutate(null, {
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
  };
  const [data, setData] = useState<string[]>(() => {
    const localData = localStorage.getItem("students");
    return localData ? JSON.parse(localData) : [];
  });

  const handleModalConfirm = async () => {
    try {
      await postStudents(data);
    } catch (error) {
      console.log(error);
    }

    const dataFormChange = () => {};

    //추가 시에 data에 들어있던 학생들을 post 해 주기

    const handleSaveModalCancel = () => {
      setSaveModal(false);
    };

    const handleSaveModalConfirm = () => {
      setSaveModal(false);
    };

    const threeStyle = " bg-white text-label1 rounded-lg py-3 px-25";
    
    const router = useRouter();

    const onClickBtn = () => {
      router.push("/main");
    };

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
                <Button
                  colorType="ghost"
                  buttonSize="small"
                  onClick={onClickAdd}
                >
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
                <div className=" flex flex-col gap-8">
                  <div className=" flex gap-20">
                    <div className=" text-heading5 justify-center flex text-primary-100 w-29">
                      창조실
                    </div>
                    <div className="flex gap-11">
                      <div className={threeStyle}>8교시</div>
                      <div className={threeStyle}>9교시</div>
                      <div className={threeStyle}>10교시</div>
                    </div>
                  </div>
                  <div className=" flex gap-13">
                    <div className=" flex flex-col gap-6 w-27%">
                      {datalist?.map((item, index) => (
                        <div
                          className="flex w-max bg-white py-4 px-6 rounded-lg text-label1"
                          key={index}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                    <div className=" flex gap-x-11 gap-y-6 flex-wrap content-start">
                      {edit ? (
                        <>
                          {/* {datalist?.map((item, index) => {
                          <AfterCheck state={"무단"} key={index} day={3} />;
                        })} */}
                          {datalist?.map((item, index) => {
                            <AfterCheck state={"무단"} key={index} day={3} />;
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
                      <AfterDelete
                        student={item.name}
                        key={index}
                        id={item.id}
                      />
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
                  heading1={`${datalist?.length}외 1명의`}
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
};

export default AfterManage;
