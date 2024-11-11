"use client";
// hooks
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
// fonts
import { magra_700 } from "../fonts";
// types
import { FC } from "react";
import { Absence, Activity, Grade, Subject } from "@/types/curriculum-types";
// utils
import { updateCurriculum } from "@/mongodb/curriculums";
import { validateSubjectForm } from "@/general-utils/validateSubjecForm";
import { deleteSubject } from "@/server-utils/curriculum-functions";
// components
import GradesInput from "./GradesInput";
import {
  ActivityInput,
  ConduitInput,
  FormSubmitDelete,
  SubjectNameInput
} from "./SubjectFormInputs";
import SubjectAbsencesInput from "./SubjectAbsencesInput";
import LocationInput from "./LocationInput";
import useSubjectsOrder from "@/hooks/useSubjectsOrder";
import useSubjectInputs from "@/hooks/useSubjectInputs";

const EditSubjectForm: FC<{
  subject: Subject;
  curriculumId: string;
}> = ({ subject, curriculumId }) => {
  const router = useRouter();

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
  } = useSubjectInputs(subject);

  const [error, setError] = useState<string | null>(null);

  const subjectsOrder = useSubjectsOrder(curriculumId);

  const handleSubmit = async (newSubject: Subject) => {
    const subjectIndex = subjectsOrder.finalValue.findIndex(
      (s) => s.id.$oid === subject.id.$oid
    );

    if (subjectIndex === -1)
      return `Subject with ID ${subject.id.$oid} not found in the curriculum.`;

    subjectsOrder.finalValue[subjectIndex] = {
      ...newSubject
    };

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
    handleSubmit({
      id: subject.id,
      subjectName: name,
      absences,
      grades,
      activity,
      conduit
    });
  };

  const handleDeleteSubject = async () => {
    await deleteSubject(curriculumId, subject.id.$oid);
    router.push("/catalogul-meu");
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
        <LocationInput subjectsOrder={subjectsOrder} subject={subject} />

        <div className="text-red-500">{error}</div>
      </form>
      <FormSubmitDelete
        submitForm={submitForm}
        deleteSubject={handleDeleteSubject}
      />
    </div>
  );
};

export default EditSubjectForm;
