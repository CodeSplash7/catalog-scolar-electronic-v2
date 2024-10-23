import { WithObjectId } from "@/types/fetching-types";
export interface CurriculumDocument {
  absences: CurriculumAbsences;
  subjects: Subject[];
  overallAverage: number;
}

export interface CurriculumAbsences {
  total: number;
  excused: number;
}

export interface Subject {
  id: { $oid: string };
  subjectName: string;
  grades: Grade[];
  absences: Absence[];
  activity: Activity;
  conduit: number;
}

export interface Grade {
  id: { $oid: string };
  score: number;
  date: string; // ISO date string
}

export interface Absence {
  id: { $oid: string };
  date: string; // ISO date string
  excused: boolean;
}

export interface Activity {
  good: number;
  bad: number;
}
