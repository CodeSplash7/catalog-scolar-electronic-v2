"use client";
import React, { useEffect, useMemo, useState } from "react";
import { magra_700 } from "../fonts"; // Import the font for the title
import { Absence, Activity, Grade, Subject } from "@/types/curriculum-types";
import { validateSubjectForm } from "@/general-utils/validateSubjecForm";
import {
  getAllSubjects,
  updateSubject
} from "@/server-utils/curriculum-functions";
import { useRouter } from "next/navigation";
import GradesInput from "./GradesInput";
import {
  ActivityInput,
  ConduitInput,
  FormSubmitDelete,
  SubjectNameInput
} from "./SubjectFormInputs";
import SubjectAbsencesInput from "./SubjectAbsencesInput";
import ModalListInput from "./ModalListInput";
import LocationInput from "./LocationInput";

const EditSubjectForm: React.FC<{
  subject: Subject;
  curriculumId: string;
}> = ({ subject, curriculumId }) => {
  const router = useRouter();

  const [subjectName, setSubjectName] = useState<string>(subject.subjectName);
  const [absences, setAbsences] = useState<Absence[]>(subject.absences);
  const [grades, setGrades] = useState<Grade[]>(subject.grades);
  const [activity, setActivity] = useState<Activity>(subject.activity);
  const [conduit, setConduit] = useState<number>(subject.conduit);
  const [error, setError] = useState<string | null>(null);

  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  useEffect(() => {
    const fetchAllSubjects = async () => {
      const { result, error } = await getAllSubjects(curriculumId);
      if (error || !result) return;
      setAllSubjects(result);
    };
    fetchAllSubjects();
  }, []);

  const handleSubmit = async (newSubject: Subject) => {
    await updateSubject(curriculumId, subject.id.$oid, newSubject);
    router.push("/catalogul-meu");
  };

  const validateForm = useMemo(() => {
    const errors = validateSubjectForm({
      subjectName,
      absences,
      grades,
      activity,
      conduit
    });
    if (errors) setError(errors[0]);

    return !!errors;
  }, [subjectName, absences, grades, activity, conduit]);
  const submitForm = async () => {
    if (validateForm) return;
    handleSubmit({
      id: subject.id,
      subjectName,
      absences,
      grades,
      activity,
      conduit
    });
  };

  return (
    <div className="w-full rounded-lg flex flex-col gap-[16px] h-full justify-between">
      <h2
        className={`${magra_700.className} text-2xl text-start mb-4 underline`}
      >
        Editeaza materia
      </h2>
      <form className="flex flex-col gap-[32px] items-start">
        <SubjectNameInput
          subjectName={subjectName}
          setSubjectName={(name: string) => setSubjectName(name)}
        />
        <div className="flex justify-between w-full">
          <SubjectAbsencesInput
            absences={absences}
            setAbsences={(absences: Absence[]) => setAbsences(absences)}
          />

          <GradesInput
            grades={grades}
            setGrades={(grades: Grade[]) => setGrades(grades)}
          />
        </div>

        <ActivityInput
          activity={activity}
          setActivity={(activity: Activity) => setActivity(activity)}
        />

        <ConduitInput
          conduit={conduit}
          setConduit={(conduit: number) => setConduit(conduit)}
        />
        <LocationInput
          setAllSubjects={setAllSubjects}
          allSubjects={allSubjects}
          subject={subject}
        />

        <div className="text-red-500">{error}</div>
      </form>
      <FormSubmitDelete submitForm={submitForm} />
    </div>
  );
};

export default EditSubjectForm;
