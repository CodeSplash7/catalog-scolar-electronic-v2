import { CurriculumDocument } from "@/types/curriculum-types";
export default function getAllAbsences(curriculum: CurriculumDocument) {
  let totalAbsences: number = 0;
  let excusedAbsences: number = 0;
  curriculum.subjects.forEach((s) =>
    s.absences.forEach((a) => {
      totalAbsences++;
      if (a.excused) excusedAbsences++;
    })
  );
  return [totalAbsences, excusedAbsences];
}
