import { Absence, Activity, Grade, Subject } from "@/types/curriculum-types";
import { useState } from "react";

const useSubjectInputs = (
  subject: Subject = {
    id: { $oid: "" },
    subjectName: "",
    absences: [],
    activity: { good: 0, bad: 0 },
    conduit: 10,
    grades: []
  }
) => {
  const [name, setName] = useState<string>(subject?.subjectName);
  const [absences, setAbsences] = useState<Absence[]>(subject.absences);
  const [grades, setGrades] = useState<Grade[]>(subject.grades);
  const [activity, setActivity] = useState<Activity>(subject.activity);
  const [conduit, setConduit] = useState<number>(subject.conduit);
  return {
    name,
    setName,
    absences,
    setAbsences,
    grades,
    setGrades,
    activity,
    setActivity,
    conduit,
    setConduit
  };
};

export default useSubjectInputs;
