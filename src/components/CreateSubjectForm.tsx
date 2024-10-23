"use client";
import React, { useMemo, useState } from "react";
import { open_sans_700 } from "../fonts"; // Import the font for the title
import { Absence, Activity, Grade, Subject } from "@/types/curriculum-types";
import { validateSubjectForm } from "@/general-utils/validateSubjecForm";
import newStringId from "@/server-utils/newStringId";
import { useRouter } from "next/navigation";
import { createSubject } from "@/server-utils/curriculum-functions";

const CreateSubjectForm: React.FC<{
  curriculumId: string;
}> = ({ curriculumId }) => {
  const router = useRouter();

  const [subjectName, setSubjectName] = useState<string>("");
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [activity, setActivity] = useState<Activity>({ good: 0, bad: 0 });
  const [conduit, setConduit] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (newSubject: Subject) => {
    console.log(curriculumId)
    const { result, error } = await createSubject(curriculumId, newSubject);
    console.log(result, error)
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
  }, [subjectName, absences, grades, activity, conduit, error]);
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
    <div className="card w-11/12 bg-white p-6 rounded-lg shadow-lg">
      <h2 className={`${open_sans_700.className} text-2xl text-center mb-4`}>
        Edit Subjectd
      </h2>
      <form className="flex flex-col items-start">
        <SubjectNameInput
          subjectName={subjectName}
          setSubjectName={(name: string) => setSubjectName(name)}
        />
        <SubjectAbsencesInput
          absences={absences}
          setAbsences={(absences: Absence[]) => setAbsences(absences)}
        />

        <GradeInput
          grades={grades}
          setGrades={(grades: Grade[]) => setGrades(grades)}
        />

        <ActivityInput
          activity={activity}
          setActivity={(activity: Activity) => setActivity(activity)}
        />

        <ConduitInput
          conduit={conduit}
          setConduit={(conduit: number) => setConduit(conduit)}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            submitForm();
          }}
          type="submit"
          className="bg-green-500 text-white rounded-lg px-6 py-3 mt-4 text-lg font-semibold hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out w-full"
        >
          Save
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            router.push("/catalogul-meu")
          }}
          type="submit"
          className="bg-red-500 text-white rounded-lg px-6 py-3 mt-4 text-lg font-semibold hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out w-full"
        >
          Delete subject
        </button>
        <div>{error}</div>
      </form>
    </div>
  );
};

export default CreateSubjectForm;

const SubjectNameInput: React.FC<{
  subjectName: string;
  setSubjectName: (name: string) => void;
}> = ({ subjectName, setSubjectName }) => (
  <div className="flex flex-col items-start gap-2">
    <label className="text-lg">Subject Name:</label>
    <input
      type="text"
      className="border border-gray-300 rounded-lg p-2 text-lg w-full"
      value={subjectName}
      onChange={(e) => setSubjectName(e.target.value)}
    />
  </div>
);

const SubjectAbsencesInput: React.FC<{
  absences: Absence[];
  setAbsences: (absences: Absence[]) => void;
}> = ({ absences, setAbsences }) => {
  const addNewAbsence = async () => {
    const newAbsence = {
      date: new Date().toString(),
      excused: false,
      id: { $oid: await newStringId() }
    } as Absence;

    setAbsences([...absences, newAbsence]);
  };
  return (
    <div className="flex flex-col items-start gap-2 w-full ">
      <label className="text-lg">Subject Absences:</label>
      {absences.map((absence, index) => {
        const excused = absence.excused; // Track if the absence is excused
        return (
          <div
            key={index}
            className={`flex flex-col items-start gap-2 relative`}
          >
            <div className={`w-full`}>
              <div className={"w-full h-fit relative"}>
                <input
                  type="date"
                  value={absence.date}
                  onChange={(e) => {
                    const newAbsences = [...absences];
                    newAbsences[index] = {
                      date: e.target.value,
                      excused: newAbsences[index].excused,
                      id: newAbsences[index].id
                    };
                    setAbsences(newAbsences);
                  }}
                  className={`border ${
                    excused ? "border-black bg-yellow-200 " : "border-gray-300"
                  } rounded-lg p-2 text-lg w-full`}
                  placeholder="dd-mm" // Note: Placeholder won't show in date input, but kept for reference
                />
                <div
                  className={`${
                    excused ? "" : "hidden"
                  } w-full h-[2px] bg-black absolute top-[50%]`}
                ></div>
              </div>
            </div>
            <div>
              <button
                type="button"
                className="bg-red-500 text-white rounded-lg px-4 py-2"
                onClick={() => {
                  const newAbsences = absences.filter((_, i) => i !== index);
                  setAbsences(newAbsences);
                }}
              >
                Delete
              </button>
              <button
                type="button"
                className="bg-yellow-500 text-white rounded-lg px-4 py-2"
                onClick={() => {
                  const newAbsences = [...absences];
                  newAbsences[index].excused = !newAbsences[index].excused; // Toggle excuse state
                  setAbsences(newAbsences);
                }}
              >
                Excuse
              </button>
            </div>
          </div>
        );
      })}
      <button
        type="button"
        className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2"
        onClick={addNewAbsence}
      >
        Add Absence
      </button>
    </div>
  );
};

const GradeInput: React.FC<{
  grades: Grade[];
  setGrades: (grades: Grade[]) => void;
}> = ({ grades, setGrades }) => {
  const addGrade = async () =>
    setGrades([
      ...grades,
      { score: 1, date: "", id: { $oid: await newStringId() } }
    ]);

  return (
    <div>
      <label className="text-lg">Grades:</label>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Date</th>
            <th className="text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => (
            <React.Fragment key={index}>
              <tr className="w-full">
                <td className="w-1/2">
                  <input
                    type="date"
                    value={grade.date}
                    onChange={(e) => {
                      const newGrades = [...grades];
                      newGrades[index].date = e.target.value;
                      setGrades(newGrades);
                    }}
                    min={0}
                    max={10}
                    className="border border-gray-300 rounded-lg p-2 text-lg w-full"
                  />
                </td>
                <td className="w-1/2 flex items-center gap-2">
                  <button
                    type="button"
                    className="bg-blue-500 text-white rounded-lg px-4 py-2"
                    onClick={() => {
                      const newGrades = [...grades];
                      if (newGrades[index].score <= 1) return;
                      const currentScore = newGrades[index].score || 0;
                      newGrades[index].score = Math.max(currentScore - 1, 0);
                      setGrades(newGrades);
                    }}
                  >
                    ←
                  </button>
                  <input
                    type="number"
                    value={grade.score}
                    onChange={(e) => {
                      const newGrades = [...grades];
                      newGrades[index].score = Number(e.target.value);
                      setGrades(newGrades);
                    }}
                    className="border border-gray-300 rounded-lg p-2 text-lg w-[3rem] text-center"
                    min="0"
                    max="99"
                  />
                  <button
                    type="button"
                    className="bg-blue-500 text-white rounded-lg px-4 py-2"
                    onClick={() => {
                      const newGrades = [...grades];
                      if (newGrades[index].score > 9) return;
                      const currentScore = newGrades[index].score || 0;
                      newGrades[index].score = Math.min(currentScore + 1, 99);

                      setGrades(newGrades);
                    }}
                  >
                    →
                  </button>
                </td>
                <td colSpan={2} className="text-right">
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded-lg px-4 py-2"
                    onClick={() => {
                      const newGrades = grades.filter((_, i) => i !== index);
                      setGrades(newGrades);
                    }}
                  >
                    X
                  </button>
                </td>
              </tr>
              {/* Delete button */}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2"
        onClick={addGrade}
      >
        +
      </button>
    </div>
  );
};

const ActivityInput: React.FC<{
  activity: Activity;
  setActivity: (activity: Activity) => void;
}> = ({ activity, setActivity }) => (
  <div className={`w-full h-fit flex flex-col gap-[8px]`}>
    <label className="text-lg">Activity</label>
    <div className={`w-full flex`}>
      <div className={`w-full flex`}>
        <label>Good:</label>
        <button
          type="button"
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
          onClick={() => {
            if (activity.good > 0)
              setActivity({ ...activity, good: activity.good - 1 });
          }}
        >
          ←
        </button>
        <input
          className="border border-gray-300 rounded-lg p-2 text-lg w-[3rem] text-center"
          type="number"
          value={activity.good}
          onChange={(e) =>
            setActivity({ ...activity, good: Number(e.target.value) })
          }
          min={0}
        />
        <button
          type="button"
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
          onClick={() => {
            if (activity.good >= 0)
              setActivity({ ...activity, good: activity.good + 1 });
          }}
        >
          →
        </button>
      </div>
      <div className={`w-full flex`}>
        <label>Bad:</label>

        <button
          type="button"
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
          onClick={() => {
            if (activity.bad > 0)
              setActivity({ ...activity, bad: activity.bad + 1 });
          }}
        >
          ←
        </button>
        <input
          className="border border-gray-300 rounded-lg p-2 text-lg w-[3rem] text-center"
          value={activity.bad}
          onChange={(e) =>
            setActivity({ ...activity, bad: Number(e.target.value) })
          }
          min={0}
        />
        <button
          type="button"
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
          onClick={() => {
            if (activity.bad >= 0)
              setActivity({ ...activity, bad: activity.bad + 1 });
          }}
        >
          →
        </button>
      </div>
    </div>
  </div>
);

const ConduitInput: React.FC<{
  conduit: number;
  setConduit: (conduit: number) => void;
}> = ({ conduit, setConduit }) => (
  <div className={`w-full flex`}>
    <label>Conduit:</label>
    <button
      type="button"
      className="bg-blue-500 text-white rounded-lg px-4 py-2"
      onClick={() => {
        if (conduit > 1) setConduit(conduit - 1);
      }}
    >
      ←
    </button>
    <input
      className="border border-gray-300 rounded-lg p-2 text-lg w-[3.5rem] text-center"
      type="number"
      value={conduit}
      onChange={(e) => setConduit(Number(e.target.value))}
      min={1}
    />
    <button
      type="button"
      className="bg-blue-500 text-white rounded-lg px-4 py-2"
      onClick={() => {
        if (conduit < 10) setConduit(conduit + 1);
      }}
    >
      →
    </button>
  </div>
);
