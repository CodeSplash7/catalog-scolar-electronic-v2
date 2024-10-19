import { CurriculumDocument } from "@/types/curriculum-types";
import Subject from "./Subject";

export default async function CurriculumDisplay({
  curriculum
}: {
  curriculum: CurriculumDocument;
}) {
  return <div className={`flex flex-col w-full`}>{curriculum.subjects.map((s) => <Subject subject={s}/>)}</div>;
}
