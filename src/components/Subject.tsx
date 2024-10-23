import {
  magra_700,
  open_sans_400,
  open_sans_600,
  open_sans_800
} from "@/fonts";
import getAverage from "@/general-utils/getAverage";
import { CurriculumDocument, Subject } from "@/types/curriculum-types";
import Image from "next/image";
import ClickTracker from "./ClickTracker";
import { WithId } from "mongodb";
import { WithObjectId } from "@/types/fetching-types";

// Function to format date to dd-mm
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad with zero
  return `${day}-${month}`; // Return formatted date
}

export default async function SubjectDisplay({
  subject,
  curriculum
}: {
  curriculum: WithObjectId<CurriculumDocument>;
  subject: Subject;
}) {
  return (
    <ClickTracker
      actionType="edit-subject"
      itemIdentifiers={{
        curriculumId: curriculum._id.toString(),
        subjectId: subject.id.$oid
      }}
    >
      <div
        className={`w-full h-fit grid grid-cols-[19fr_42.5fr_38.5fr] grid-rows-[58px_38px_320px_48px_45px_38px_42px] shadow-2xl`}
      >
        <div className="bg-[#017eba] col-span-3 row-span-1 flex justify-between p-[15px] border border-gray-300">
          <div
            className={`flex items-start text-[16px] ${magra_700.className} text-white`}
          >
            {subject.subjectName}
          </div>
          <Image
            className={`w-[40px] h-[24px]`}
            alt={"sanse medii de ascultare"}
            width={600}
            height={600}
            src="/volan-galben.png"
          />
        </div>
        <div className="text-[13px] text-[#cccccc] col-span-1 row-span-2 flex flex-col items-center justify-center border border-gray-300">
          <div className="writing-vertical">
            2<br />
            0<br />
            2<br />4
          </div>
          <div className="writing-vertical mt-2">-</div>
          <div className="writing-vertical mt-2">
            2<br />
            0<br />
            2<br />5
          </div>
        </div>
        <div
          className={`col-span-1 row-span-1 ${open_sans_800.className} font-black text-[#454545] p-[15px] text-[15px] flex items-center justify-start border border-gray-300`}
        >
          Absențe
        </div>
        <div
          className={`col-span-1 row-span-1 ${open_sans_800.className} font-black text-[#454545] p-[15px] text-[15px] flex items-center justify-start border border-gray-300`}
        >
          Note
        </div>
        <div className="col-span-1 row-span-1 border border-gray-300 px-[14px] py-[7px]">
          <div className="flex flex-wrap gap-[8px]">
            {subject.absences.map((a) => (
              <div
                className={`text-[12px] h-[10px] text-[#454545] font-bold ${open_sans_600.className}`}
              >
                {formatDate(new Date(a.date))}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 row-span-1 flex flex-col p-[7px_15px_15px_8px] border border-gray-300">
          {subject.grades.map((g) => (
            <div className="flex text-[#454545] items-center ">
              <div
                className={`text-[18px] font-bold ${open_sans_800.className}`}
              >
                {g.score}/
              </div>
              <div
                className={`text-[13px] font-bold ${open_sans_400.className}`}
              >
                {formatDate(new Date(g.date))}
              </div>
            </div>
          ))}
        </div>
        <div
          className={`col-span-3 row-span-1 p-[10px] text-start ${magra_700.className} text-[#AC2400] border border-gray-300`}
        >
          Media: {getAverage(subject.grades.map((g) => g.score))}
        </div>
        <div
          className={`col-span-3 row-span-1 p-[10px] text-start ${magra_700.className} text-[#AC2400] border border-gray-300`}
        >
          Media anuala: {getAverage(subject.grades.map((g) => g.score))}
        </div>
        <div
          className={`col-span-2 row-span-1 flex items-center p-[10px] text-start ${magra_700.className} text-[#017EBA] border border-gray-300`}
        >
          Activitate
        </div>
        <div
          className={`col-span-1 row-span-1 flex items-center p-[10px] text-start ${magra_700.className} text-[#017EBA] border border-gray-300`}
        >
          Conduită
        </div>
        <div
          className={`col-span-2 row-span-1 p-[10px] flex items-center justify-start gap-[32px] text-start ${magra_700.className} text-[#017EBA] text-[15px] border border-gray-300`}
        >
          <div className="flex gap-[4px] items-center">
            <ThumbsUp w={18} />
            {subject.activity.good}
          </div>
          <div className="flex gap-[4px] items-end">
            <ThumbsDown w={18} />
            {subject.activity.bad}
          </div>
        </div>

        <div
          className={`col-span-1 row-span-1 flex justify-center items-center p-[10px] text-start ${magra_700.className} text-[#017EBA] border border-gray-300`}
        >
          {subject.conduit === 10 ? "-" : subject.conduit}
        </div>
      </div>
    </ClickTracker>
  );
}

export const ThumbsUp = ({ w }: { w: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#2e6b62"
    width={`${w}px`}
    height={`${w}px`}
    viewBox="0 0 56 56"
  >
    <path d="M 43.9374 51.7656 C 45.7655 51.3438 47.6171 50.1484 47.6171 47.8984 C 47.6171 46.9844 47.3593 46.3516 47.0546 45.8125 C 46.8671 45.5078 46.8905 45.2734 47.1718 45.1563 C 48.6481 44.5000 49.8673 43.1875 49.8673 41.2891 C 49.8673 40.2344 49.5860 39.2735 49.0470 38.5937 C 48.7887 38.2422 48.8358 37.9610 49.2577 37.7032 C 50.3593 37.0937 51.0625 35.7344 51.0625 34.1875 C 51.0625 33.1094 50.7107 31.9141 50.0545 31.3281 C 49.7031 31.0000 49.7732 30.7656 50.1716 30.4375 C 50.9454 29.8516 51.3673 28.7266 51.3673 27.3906 C 51.3673 25.0937 49.5860 23.2422 47.2421 23.2422 L 38.8749 23.2422 C 36.7655 23.2422 35.3358 22.1406 35.3358 20.4063 C 35.3358 17.1719 39.3436 11.3594 39.3436 7.1641 C 39.3436 4.9844 37.9140 3.6719 36.0624 3.6719 C 34.3749 3.6719 33.5077 4.8437 32.5936 6.6250 C 29.1014 13.5156 24.3671 19.0703 20.7811 23.8281 C 17.7343 27.9063 16.2343 31.3281 16.1640 36.9532 C 16.0467 45.6016 23.0546 52.1875 34.0702 52.2813 L 37.3280 52.3047 C 40.3983 52.3281 42.6483 52.0937 43.9374 51.7656 Z M 4.6327 37.1172 C 4.6327 44.1484 8.9921 50.0313 14.8749 50.0313 L 19.0702 50.0313 C 14.8280 46.9375 12.8827 42.2500 12.9764 36.8828 C 13.0467 30.9297 15.3671 26.6875 17.4296 24.1094 L 13.9843 24.1094 C 8.7108 24.1094 4.6327 29.8281 4.6327 37.1172 Z" />
  </svg>
);

export const ThumbsDown = ({ w }: { w: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#ac2400"
    width={`${w}px`}
    height={`${w}px`}
    viewBox="0 0 56 56"
    className={`rotate-180 transform scale-x-[-1]`}
  >
    <path d="M 43.9374 51.7656 C 45.7655 51.3438 47.6171 50.1484 47.6171 47.8984 C 47.6171 46.9844 47.3593 46.3516 47.0546 45.8125 C 46.8671 45.5078 46.8905 45.2734 47.1718 45.1563 C 48.6481 44.5000 49.8673 43.1875 49.8673 41.2891 C 49.8673 40.2344 49.5860 39.2735 49.0470 38.5937 C 48.7887 38.2422 48.8358 37.9610 49.2577 37.7032 C 50.3593 37.0937 51.0625 35.7344 51.0625 34.1875 C 51.0625 33.1094 50.7107 31.9141 50.0545 31.3281 C 49.7031 31.0000 49.7732 30.7656 50.1716 30.4375 C 50.9454 29.8516 51.3673 28.7266 51.3673 27.3906 C 51.3673 25.0937 49.5860 23.2422 47.2421 23.2422 L 38.8749 23.2422 C 36.7655 23.2422 35.3358 22.1406 35.3358 20.4063 C 35.3358 17.1719 39.3436 11.3594 39.3436 7.1641 C 39.3436 4.9844 37.9140 3.6719 36.0624 3.6719 C 34.3749 3.6719 33.5077 4.8437 32.5936 6.6250 C 29.1014 13.5156 24.3671 19.0703 20.7811 23.8281 C 17.7343 27.9063 16.2343 31.3281 16.1640 36.9532 C 16.0467 45.6016 23.0546 52.1875 34.0702 52.2813 L 37.3280 52.3047 C 40.3983 52.3281 42.6483 52.0937 43.9374 51.7656 Z M 4.6327 37.1172 C 4.6327 44.1484 8.9921 50.0313 14.8749 50.0313 L 19.0702 50.0313 C 14.8280 46.9375 12.8827 42.2500 12.9764 36.8828 C 13.0467 30.9297 15.3671 26.6875 17.4296 24.1094 L 13.9843 24.1094 C 8.7108 24.1094 4.6327 29.8281 4.6327 37.1172 Z" />
  </svg>
);
