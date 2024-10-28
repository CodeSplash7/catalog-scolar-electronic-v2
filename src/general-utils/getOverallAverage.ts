import { CurriculumDocument } from "@/types/curriculum-types";
import getAverage from "./getAverage";
export default function getOverallAverage(curriculum: CurriculumDocument) {
  const averageList: number[] = [];
  for (let i = 0; i < curriculum.subjects.length; i++) {
    const average = getAverage(
      curriculum.subjects[i].grades.map((g) => g.score)
    );
    if (average) averageList.push(average);
  }
  const overallAverage = getAverage(averageList);
  return overallAverage;
}
