import { CurriculumDocument } from "@/types/curriculum-types";
export default function getAllAbsences(curriculum: CurriculumDocument) {
  let totalAbsences: number = 0;
  let unexcusedAbsences: number = 0;
  curriculum.subjects.forEach((s) =>
    s.absences.forEach((a) => {
      totalAbsences++;
      if (!a.excused) unexcusedAbsences++;
    })
  );
  return [totalAbsences, unexcusedAbsences];
}
