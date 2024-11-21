import options, { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import {
  FathersInitialInput,
  FirstNameInput,
  GradeLevelInput,
  LastNameInput,
  SectionInput
} from "@/components/UserInfoInputs";
import { magra_700 } from "@/fonts";
import routes from "@/general-utils/page-routes";
import { getCurriculumById } from "@/mongodb/curriculums";
import { getUserById } from "@/mongodb/users";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogOutButton from "@/components/LogOutButton";
import Welcome from "@/components/Welcome";
import ControlPanel from "@/components/ControlPanel";

export default async function PanouDeControlPage() {
  const session = (await getServerSession(options)) as CustomSession;
  if (!session) {
    redirect(routes.signin());
  }

  // User
  const { result: user, error: userError } = await getUserById(session.user.id);
  if (userError || !user) throw userError;

  // Curriculum
  const { result: curriculum, error: curriculumError } =
    await getCurriculumById(user.profile.curriculumId);
  if (curriculumError || !curriculum) throw curriculumError;

  return (
    <div
      className={`w-full h-fit px-[32px] py-[32px] flex flex-col gap-[32px]`}
    >
      <div className="w-full h-fit flex justify-end">
        <LogOutButton />
      </div>
      <Welcome username={user.profile.username} />

      <ControlPanel curriculum={curriculum} />
      <div className={`w-full h-fit flex flex-col gap-[16px]`}>
        <div
          className={`underline text-[30px] tracking-[2px] ${magra_700.className}`}
        >
          Datele tale
        </div>
        <div className={`w-full h-fit flex flex-col gap-[24px]`}>
          <LastNameInput
            onChange={null}
            showValue
            showLabel
            userId={user._id.toString()}
            lastName={user.profile.lastName}
          />
          <FirstNameInput
            onChange={null}
            showValue
            showLabel
            userId={user._id.toString()}
            firstName={user.profile.firstName}
          />
          <FathersInitialInput
            onChange={null}
            showValue
            showLabel
            userId={user._id.toString()}
            fatherInitial={user.profile.fathersInitial}
          />
          <GradeLevelInput
            onChange={null}
            showValue
            showLabel
            userId={user._id.toString()}
            gradeLevel={user.profile.userClass.gradeLevel}
          />
          <SectionInput
            onChange={null}
            showValue
            showLabel
            userId={user._id.toString()}
            section={user.profile.userClass.section}
          />
        </div>
      </div>
    </div>
  );
}
