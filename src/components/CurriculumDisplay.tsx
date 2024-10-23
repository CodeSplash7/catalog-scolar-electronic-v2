import { CurriculumDocument } from "@/types/curriculum-types";
import SubjectDisplay from "./Subject";
import { WithObjectId } from "@/types/fetching-types";

export default async function CurriculumDisplay({
  curriculum
}: {
  curriculum: WithObjectId<CurriculumDocument>;
}) {
  return (
    <div className={`flex flex-col w-full gap-[16px] `}>
      {curriculum.subjects.map((s) => (
        <SubjectDisplay key={s.id.$oid} curriculum={curriculum} subject={s} />
      ))}
    </div>
  );
}
