"use client";
// hooks
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
// fonts
import { magra_700 } from "@/fonts";
// types
import { Absence, Activity, Grade } from "@/types/curriculum-types";
import { FC } from "react";
// utils
import { validateSubjectForm } from "@/general-utils/validateSubjecForm";
import newStringId from "@/server-utils/newStringId";
// components
import SubjectAbsencesInput from "./SubjectAbsencesInput";
import GradesInput from "./GradesInput";
import {
  ActivityInput,
  ConduitInput,
  FormSubmitDelete,
  SubjectNameInput
} from "./SubjectFormInputs";
import LocationInput from "./LocationInput";
import { updateCurriculum } from "@/mongodb/curriculums";
import useSubjectsOrder from "@/hooks/useSubjectsOrder";
import useSubjectInputs from "@/hooks/useSubjectInputs";

const CreateSubjectForm: FC<{
  curriculumId: string;
}> = ({ curriculumId }) => {
  const router = useRouter();
  // form inputs
  const {
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
  } = useSubjectInputs();
  const [error, setError] = useState<string | null>(null);

  const [mockSubject] = useState({
    id: { $oid: "123" },
    subjectName: "Materia nouă",
    absences,
    grades,
    activity,
    conduit
  });
  const subjectsOrder = useSubjectsOrder(curriculumId, mockSubject);

  const handleSubmit = async () => {
    await updateCurriculum(curriculumId, {
      subjects: subjectsOrder.finalValue
    });
    router.push("/catalogul-meu");
  };

  const validateForm = useMemo(() => {
    const errors = validateSubjectForm({
      subjectName: name,
      absences,
      grades,
      activity,
      conduit
    });
    if (errors) setError(errors[0]);

    return !!errors;
  }, [name, absences, grades, activity, conduit]);

  const submitForm = async () => {
    if (validateForm) return;
    // const newSubject = { ...mockSubject, id: { $oid: await newStringId() } };
    const newSubject = subjectsOrder.finalValue.find(
      (s) => s.id.$oid === mockSubject.id.$oid
    )!;
    newSubject.id = { $oid: await newStringId() };
    newSubject.subjectName = name;
    newSubject.absences = absences;
    newSubject.grades = grades;
    newSubject.activity = activity;
    newSubject.conduit = conduit;

    handleSubmit();
  };

  return (
    <div className="w-full rounded-lg flex flex-col gap-[16px] h-full justify-between">
      <h2
        className={`${magra_700.className} text-2xl text-start mb-4 underline`}
      >
        Crează o materie nouă
      </h2>
      <form className="flex flex-col gap-[32px] items-start">
        <SubjectNameInput
          subjectName={name}
          setSubjectName={(name: string) => setName(name)}
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

        <LocationInput subjectsOrder={subjectsOrder} subject={mockSubject} />

        <div className="text-red-500">{error}</div>
      </form>
      <FormSubmitDelete submitForm={submitForm} />
    </div>
  );
};

export default CreateSubjectForm;
