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

const AfterManage = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [saveModal, setSaveModal] = useState<boolean>(false);

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

  const handleModalCancel = () => {
    setModal(false);
  };

  const handleModalConfirm = () => {
    setModal(false);
  };

  const handleSaveModalCancel = () => {
    setSaveModal(false);
  };

  const handleSaveModalConfirm = () => {
    setSaveModal(false);
  };

  const commonStyle = " bg-white text-label1 rounded-lg py-3 px-10";

  const threeStyle = " bg-white text-label1 rounded-lg py-3 px-25";

  const router = useRouter();

  const onClickBtn = () => {
    router.push("/main");
  };

  const [datalist, setDatalist] = useState({
    name: [
      "1410 박현아",
      "1410 박수현",
      "1410 강해민",
      "1410 육기준",
      "1410 김도경",
      "1410 조영준",
    ],
    state: ["취업", "자퇴", "출석", "현체", "귀가", "출석"],
    id: ["", "", "", "", "", ""],
  });

  const handleDelete = (index: number) => {
    setDatalist((prevList) => {
      const updatedList = { ...prevList };
      updatedList.name.splice(index, 1);
      updatedList.state.splice(index, 1);
      return updatedList;
    });
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
            <div className="flex items-center gap-5">
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
              <Dropdown type="floor" />
              <Dropdown type="club" />
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
                  <div className=" flex flex-col gap-6">
                    {datalist.name.map((name, index) => (
                      <div
                        className="flex w-max bg-white py-4 px-6 rounded-lg text-label1"
                        key={index}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                  <div className=" flex gap-x-11 gap-y-6 flex-wrap content-start">
                    {edit ? (
                      <>
                        <AfterCheck state="현체" day={3} edit={true} />
                        <AfterCheck state="무단" day={3} edit={true} />
                        <AfterCheck state="이동" day={3} edit={true} />
                        <AfterCheck state="현체" day={3} edit={true} />
                        <AfterCheck state="무단" day={3} edit={true} />
                        <AfterCheck state="이동" day={3} edit={true} />
                      </>
                    ) : (
                      <>
                        <AfterCheck state="현체" day={3} />
                        <AfterCheck state="무단" day={3} />
                        <AfterCheck state="이동" day={3} />
                        <AfterCheck state="현체" day={3} />
                        <AfterCheck state="무단" day={3} />
                        <AfterCheck state="이동" day={3} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className=" flex gap-8 flex-col">
                <div className=" text-heading5 text-primary-100">창조실</div>
                <div className=" flex gap-x-13 gap-y-5 flex-wrap">
                  {datalist.name.map((name, index) => (
                    <AfterDelete student={name} key={index} id="dddfmkadkkkl" />
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
                heading1={`${datalist.name.length}외 1명의`}
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
