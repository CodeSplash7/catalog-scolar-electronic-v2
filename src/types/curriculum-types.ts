export interface CurriculumDocument {
  absences: CurriculumAbsences;
  subjects: SubjectDocument[];
}

export interface CurriculumAbsences {
  total: number;
  excused: number;
}

export interface SubjectDocument {
  subjectName: string;
  grades: GradeDocument[];
  absences: AbsenceDocument[];
  activity: Activity;
  conduit: number;
}

export interface GradeDocument {
  score: number;
  date: string; // ISO date string
}

export interface AbsenceDocument {
  date: string; // ISO date string
  excused: boolean;
}

export interface Activity {
  good: number;
  bad: number;
}
