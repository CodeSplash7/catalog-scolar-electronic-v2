import options, { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import ChangeSubjectsOrder from "@/components/ChangeSubjectsOrder";
import {
  FathersInitialInput,
  FirstNameInput,
  GradeLevelInput,
  LastNameInput,
  SectionInput
} from "@/components/UserInfoInputs";
import ModalListInput from "@/components/ModalListInput";
import { magra_400, magra_700 } from "@/fonts";
import routes from "@/general-utils/page-routes";
import { getCurriculumById } from "@/mongodb/curriculums";
import { getUserById } from "@/mongodb/users";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PanouDeControlPage() {
  const session = (await getServerSession(options)) as CustomSession;
  if (!session) {
    redirect(routes.signin());
  }

  // Fetch User
  const { result: user, error: userError } = await getUserById(
    // session.user.name
    session.user.id
  );
  if (userError || !user) throw userError;

  // Fetch curriculum
  const { result: curriculum, error: curriculumError } =
    await getCurriculumById(user.profile.curriculumId);
  if (curriculumError || !curriculum) throw curriculumError;

  return (
    <div
      className={`w-full h-fit px-[32px] py-[32px] flex flex-col gap-[32px]`}
    >
      <div className={`${magra_400.className} text-[30px] text-blue-600`}>
        BINE AI VENIT!{" "}
        <div className={`${magra_700.className} text-gray-900 w-fit`}>
          {user.profile.username}
        </div>
      </div>

      <div className={`w-full h-fit flex flex-col gap-[16px]`}>
        <div
          className={`underline text-[30px] tracking-[2px] ${magra_700.className}`}
        >
          Panou de control
        </div>
        <div className={`w-full h-fit flex flex-col gap-[8px]`}>
          <Link
            href={`/create/${curriculum._id}`}
            className={`text-white text-center bg-[#007bff] px-[16px] py-[8px] rounded-md`}
          >
            Creeaza o materia nouă
          </Link>
          <ChangeSubjectsOrder curriculumId={curriculum._id.toString()} />
          <ModalListInput
            label={null}
            addItem={false}
            deleteAll={false}
            revertChanges={false}
            saveChanges={false}
            triggerLabel="Modifica o materie"
          >
            {curriculum.subjects.map((s) => (
              <Link
                key={s.id.$oid}
                className={`underline`}
                href={routes.edit(curriculum._id.toString(), s.id.$oid)}
              >
                {s.subjectName}
              </Link>
            ))}
          </ModalListInput>
        </div>
      </div>
      <div className={`w-full h-fit flex flex-col gap-[16px]`}>
        <div
          className={`underline text-[30px] tracking-[2px] ${magra_700.className}`}
        >
          Datele tale
        </div>
        <div className={`w-full h-fit flex flex-col gap-[24px]`}>
          <div className={`w-full h-fit flex gap-[8px] items-center`}>
            <div>Numele de familie: </div>
            <div className={`font-bold`}>{user.profile.lastName}</div>
            <div>
              <LastNameInput
                userId={user._id.toString()}
                userLastName={user.profile.lastName}
              />
            </div>
          </div>
          <div className={`w-full h-fit flex gap-[8px]`}>
            <div>Numele: </div>
            <div className={`font-bold`}>{user.profile.firstName}</div>
            <div>
              <FirstNameInput
                userId={user._id.toString()}
                userFirstName={user.profile.firstName}
              />
            </div>
          </div>
          <div className={`w-full h-fit flex gap-[8px]`}>
            <div>Initiala tatalui: </div>
            <div className={`font-bold`}>{user.profile.fathersInitial}</div>
            <div>
              <FathersInitialInput
                userId={user._id.toString()}
                userFatherInitial={user.profile.fathersInitial}
              />
            </div>
          </div>
          <div className={`w-full h-fit flex gap-[8px]`}>
            <div>Clasa: </div>
            <div className={`font-bold`}>
              {user.profile.userClass.gradeLevel}
            </div>
            <div>
              <GradeLevelInput
                userId={user._id.toString()}
                userGradeLevel={user.profile.userClass.gradeLevel}
              />
            </div>
          </div>
          <div className={`w-full h-fit flex gap-[8px]`}>
            <div>Sectiunea: </div>
            <div className={`font-bold`}>{user.profile.userClass.section}</div>
            <div>
              <SectionInput
                userId={user._id.toString()}
                userSection={user.profile.userClass.section}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
