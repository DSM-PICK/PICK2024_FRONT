import Header from "@/app/components/common/header/page";
import { PreviousList } from "@/app/components/common/list/previous/page";
import Link from "next/link";

interface PreProps {
  student: string;
}

const Previous: React.FC<PreProps> = ({ student }) => {
  const listcommon =
    "flex justify-center items-center text-sub-title1-M text-neutral-50";
  return (
    <div className=" flex flex-col">
      <Header teacher="dd" />
      <div className=" flex flex-col gap-7 px-100 py-16 h-90%">
        <div className="text-neutral-200 text-sub-title3-B">
          <Link href="/main">홈</Link> &gt;
          <Link href="/outList">외출자 목록</Link> &gt; {student}의 이전 외출
        </div>
        <div className=" font-sans text-heading4 text-gray-900">
          {student}의 이전 외출
        </div>
        <div className="w-auto gap-4 rounded-xl bg-primary-1200 h-full px-10 py-10">
          <div className=" flex items-end flex-col gap-4">
            <div className="flex">
              <div className={`${listcommon} w-44 h-15`}>날짜</div>
              <div className={`${listcommon} w-54 h-15`}>시간</div>
              <div className={`${listcommon} w-120 h-15`}>사유</div>
            </div>
            <PreviousList
              type="home"
              date="2월 19일"
              time="11:20"
              why="집에가고싶어서"
            />
            <PreviousList
              type="out"
              date="2월 19일"
              time="11:20 ~ 14:30"
              why="집에가고싶어서집에가려고하는데막지마세요이랄까욬ㅋㅋㅋㅋㅋ"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Previous;
