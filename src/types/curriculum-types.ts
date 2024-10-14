export interface Curriculum {
  id: string; // ObjectId
  absences: CurriculumAbsences;
  subjects: Subject[];
}

export interface CurriculumAbsences {
  total: number;
  excused: number;
}

export interface Subject {
  id: string; // ObjectId
  subjectName: string;
  grades: Grade[];
  absences: Absence[];
  activity: Activity;
  conduit: number;
}

export interface Grade {
  id: string; // ObjectId
  score: number;
  date: string; // ISO date string
}

export interface Absence {
  id: string; // ObjectId
  date: string; // ISO date string
  excused: boolean;
}

export interface Activity {
  good: number;
  bad: number;
}
