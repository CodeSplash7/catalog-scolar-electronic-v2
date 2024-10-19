"use server";

import { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import CurriculumDisplay from "@/components/CurriculumDisplay";
import { magra_400, magra_700 } from "@/fonts";
import { getCurriculumById } from "@/mongodb/curriculums";
import { getUserByUsername } from "@/mongodb/users";
import { CurriculumDocument } from "@/types/curriculum-types";
import { UserDocument } from "@/types/user-types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CatalogulMeuPage() {
  const session = (await getServerSession()) as CustomSession;

  if (!session) {
    redirect("/api/auth/signin"); // Redirect to sign-in page if not logged in
  }

  const { result: user, error: userError } = await getUserByUsername(
    session.user.name
  );
  if (userError || !user) return;

  const { result: curriculum, error: curriculumError } =
    await getCurriculumById(user.profile.curriculumId);
  if (curriculumError || !curriculum) return;

  return (
    <div className="flex flex-col w-full h-fit px-[16px] gap-[36px]">
      <div className="flex flex-col items-center w-full h-fit mt-[104px]">
        <UserIcon w={128} />
        <UserMainInformation user={user} />
        <UserCurriculum curriculum={curriculum} />
      </div>
      <div className={`px-[32px]`}><CurriculumDisplay curriculum={curriculum}/></div>
    </div>
  );
}

const UserIcon = ({ w }: { w: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={`${w}px`}
    height={`${w}px`}
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle cx="12" cy="9" r="3" stroke="#1C274C" stroke-width="1" />
    <circle cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1" />
    <path
      d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
      stroke="#1C274C"
      stroke-width="1"
      stroke-linecap="round"
    />
  </svg>
);

const UserMainInformation = ({ user }: { user: UserDocument }) => (
  <div
    className={`text-[18px] text-[#E94E4C] ${magra_400.className}`}
  >{`${user.profile.lastName.toUpperCase()} ${user.profile.fathersInitial.toUpperCase()} ${user.profile.firstName.toUpperCase()} - Clasa a ${
    user.profile.userClass.gradeLevel
  }-a ${user.profile.userClass.section}`}</div>
);

const UserCurriculum = ({ curriculum }: { curriculum: CurriculumDocument }) => (
  <div className={`flex flex-col w-full items-end gap-[4px]`}>
    <div className={`${magra_700.className} text-[16px] text-[#AC2400]`}>
      Media generală: {curriculum.overallAverage || "-"}
    </div>
    <div className={`${magra_700.className} text-[16px] text-[#017EBA]`}>
      Absențe: {curriculum.absences.total} / {curriculum.absences.excused}
    </div>
  </div>
);
