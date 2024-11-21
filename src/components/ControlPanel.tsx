import { magra_700 } from "@/fonts";
import Link from "next/link";
import ChangeSubjectsOrder from "./ChangeSubjectsOrder";
import ModalListInput from "./ModalListInput";
import routes from "@/general-utils/page-routes";
import { CurriculumDocument } from "@/types/curriculum-types";
import { WithObjectId } from "@/types/fetching-types";

export default async function ControlPanel({
  curriculum
}: {
  curriculum: WithObjectId<CurriculumDocument>;
}) {
  return (
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
  );
}
