"use client";
// hooks
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
// fonts
import { magra_700 } from "@/fonts";
// types
import { Absence, Activity, Grade, Subject } from "@/types/curriculum-types";
import { FC } from "react";
// utils
import { validateSubjectForm } from "@/general-utils/validateSubjecForm";
import newStringId from "@/server-utils/newStringId";
import { createSubject } from "@/server-utils/curriculum-functions";
import routes from "@/general-utils/page-routes";
// components
import SubjectAbsencesInput from "./SubjectAbsencesInput";
import GradesInput from "./GradesInput";
import { ActivityInput, ConduitInput, FormSubmitDelete, SubjectNameInput } from "./SubjectFormInputs";


const CreateSubjectForm: FC<{
  curriculumId: string;
}> = ({ curriculumId }) => {
  const router = useRouter();
  // form inputs
  const [subjectName, setSubjectName] = useState<string>("");
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [activity, setActivity] = useState<Activity>({ good: 0, bad: 0 });
  const [conduit, setConduit] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (newSubject: Subject) => {
    await createSubject(curriculumId, newSubject);
    router.push(routes.catalogulMeu());
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
      id: { $oid: await newStringId() },
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
        Crează o materie nouă
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

        <div className="text-red-500">{error}</div>
      </form>
      <FormSubmitDelete submitForm={submitForm} />
    </div>
  );
};

export default CreateSubjectForm;
