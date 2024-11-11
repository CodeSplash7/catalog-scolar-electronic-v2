"use client";

// general-utils
import newStringId from "@/server-utils/newStringId";
// types
import { Grade } from "@/types/curriculum-types";
import { FC, useState } from "react";
// fonts
import { magra_400 } from "@/fonts";
// components
import ModalListInput from "./ModalListInput";
import RemoveButton from "./RemoveButton";
import NumberInput from "./NumberInput";
// hooks
import { useEffect, useMemo } from "react";

const GradesInput: FC<{
  grades: Grade[];
  setGrades: (grades: Grade[]) => void;
}> = ({ grades, setGrades }) => {
  const [initialGrades, setInitialGrades] = useState<Grade[]>(
    grades.map((g) => {
      return { ...g };
    })
  );

  const addGrade = async () =>
    setGrades([
      ...grades,
      { score: 1, date: "", id: { $oid: await newStringId() } }
    ]);

  const revertGrades = () => {
    if (JSON.stringify(grades) === JSON.stringify(initialGrades)) return false;
    setGrades(
      initialGrades.map((g) => {
        return { ...g };
      })
    );
    return true;
  };
  const saveGrades = () => {
    if (JSON.stringify(grades) === JSON.stringify(initialGrades)) return false;
    setInitialGrades(
      grades.map((g) => {
        return { ...g };
      })
    );
    return true;
  };
  const deleteAll = () => setGrades([]);

  const orderedGrades = useMemo(() => {
    return grades.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [grades]);

  useEffect(() => {
    setGrades(orderedGrades);
  }, [orderedGrades]);

  return (
    <ModalListInput
      addItem={addGrade}
      revertChanges={revertGrades}
      saveChanges={saveGrades}
      deleteAll={deleteAll}
      label="Note"
      triggerLabel="Vezi note"
    >
      <div className="w-full flex flex-col justify-start gap-[8px]">
        {grades.length ? <TableHeading /> : <></>}
        <div className={`w-full flex flex-col gap-[32px]`}>
          {orderedGrades.map((grade, index) => (
            <GradeInput
              key={grade.id.$oid}
              setGrades={setGrades}
              grades={grades}
              grade={grade}
              index={index}
            />
          ))}
        </div>
      </div>
    </ModalListInput>
  );
};

const GradeInput: React.FC<{
  setGrades: (grades: Grade[]) => void;
  grades: Grade[];
  grade: Grade;
  index: number;
}> = ({ setGrades, grades, index, grade }) => {
  return (
    <div className={"w-full flex flex-col items-start"}>
      <div className={``}>{index + 1}.</div>
      <div className={`w-full flex items-center`}>
        <GradeDateInput
          grade={grade}
          grades={grades}
          setGrades={setGrades}
          index={index}
        />
        <GradeScoreInput
          grade={grade}
          grades={grades}
          setGrades={setGrades}
          index={index}
        />
      </div>
      <div className="text-center w-full">
        <RemoveButton
          item={grade}
          list={grades}
          setList={setGrades}
          index={index}
        />
      </div>
    </div>
  );
};

const GradeScoreInput: FC<{
  grades: Grade[];
  setGrades: (grades: Grade[]) => void;
  grade: Grade;
  index: number;
}> = ({ grades, setGrades, index, grade }) => (
  <div className="w-1/2 flex items-center gap-2 p-[8px]">
    <NumberInput
      max={10}
      number={grade.score}
      setNumber={(num: number) => {
        const newGrades = [...grades];
        newGrades[index].score = num;
        setGrades(newGrades);
      }}
    />
  </div>
);

const GradeDateInput: FC<{
  grades: Grade[];
  setGrades: (grades: Grade[]) => void;
  grade: Grade;
  index: number;
}> = ({ grades, setGrades, index, grade }) => (
  <div className="w-1/2 pr-[16px]">
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
  </div>
);

const TableHeading = () => (
  <div className="w-full flex justify-start border-b border-slate-700">
    <div className={`w-full text-left ${magra_400.className}`}>Data</div>
    <div className={`w-full text-left ${magra_400.className} pl-[4px]`}>
      Punctajul
    </div>
  </div>
);

export default GradesInput;
