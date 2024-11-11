"use client";

// general-utils
import newStringId from "@/server-utils/newStringId";
// types
import { Absence } from "@/types/curriculum-types";
import { FC, useState } from "react";
// components
import ModalListInput from "./ModalListInput";
import RemoveButton from "@/components/RemoveButton";
// hooks
import { useMemo, useEffect } from "react";

const SubjectAbsencesInput: FC<{
  absences: Absence[];
  setAbsences: (absences: Absence[]) => void;
}> = ({ absences, setAbsences }) => {
  const [initialAbsences, setInitialAbsences] = useState<Absence[]>(
    absences.map((a) => {
      return { ...a };
    })
  );
  const addNewAbsence = async () =>
    setAbsences([
      ...absences,
      {
        date: new Date().toString(),
        excused: false,
        id: { $oid: await newStringId() }
      }
    ]);

  const revertAbsences = () => {
    if (JSON.stringify(absences) === JSON.stringify(initialAbsences))
      return false;

    setAbsences(
      initialAbsences.map((g) => {
        return { ...g };
      })
    );
    return true;
  };
  const saveAbsences = () => {
    if (JSON.stringify(absences) === JSON.stringify(initialAbsences))
      return false;
    setInitialAbsences(
      absences.map((a) => {
        return { ...a };
      })
    );
    return true;
  };
  const deleteAll = () => setAbsences([]);

  const orderedAbsences = useMemo(() => {
    return absences.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [absences]);

  useEffect(() => {
    setAbsences(orderedAbsences);
  }, [orderedAbsences]);

  return (
    <ModalListInput
      addItem={addNewAbsence}
      deleteAll={deleteAll}
      revertChanges={revertAbsences}
      saveChanges={saveAbsences}
      label="Absențe"
      triggerLabel="Vezi absențe"
    >
      {orderedAbsences.map((absence, index) => (
        <AbsenceInput
          key={absence.id.$oid}
          setAbsences={setAbsences}
          absences={absences}
          absence={absence}
          index={index}
        />
      ))}
    </ModalListInput>
  );
};

const AbsenceInput: FC<{
  absences: Absence[];
  setAbsences: (absences: Absence[]) => void;
  absence: Absence;
  index: number;
}> = ({ absences, setAbsences, absence, index }) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <div>{index + 1}.</div>
      <div className="w-full">
        <DateInput
          absence={absence}
          absences={absences}
          setAbsences={setAbsences}
          index={index}
        />
      </div>
      <div className="w-full flex justify-between">
        <ExcuseButton
          absence={absence}
          absences={absences}
          setAbsences={setAbsences}
          index={index}
        />
        <RemoveButton
          item={absence}
          list={absences}
          setList={setAbsences}
          index={index}
        />
      </div>
    </div>
  );
};

const DateInput: FC<{
  absences: Absence[];
  setAbsences: (absences: Absence[]) => void;
  absence: Absence;
  index: number;
}> = ({ absences, setAbsences, index, absence }) => (
  <div className="w-full h-fit relative z-[10]">
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
        absence.excused ? "border-black bg-yellow-200" : "border-gray-300"
      } rounded-lg p-2 text-lg w-full`}
      placeholder="dd-mm"
    />
    <div
      className={`${
        absence.excused ? "" : "hidden"
      } w-full h-[2px] bg-black absolute top-[50%]`}
    />
  </div>
);

const ExcuseButton: FC<{
  absences: Absence[];
  setAbsences: (absences: Absence[]) => void;
  absence: Absence;
  index: number;
}> = ({ absences, setAbsences, index, absence }) => (
  <button
    type="button"
    className="bg-yellow-500 text-white w-full flex justify-center rounded-lg px-4 py-2"
    onClick={() => {
      const newAbsences = [...absences];
      newAbsences[index].excused = !newAbsences[index].excused;
      setAbsences(newAbsences);
    }}
  >
    {absence.excused ? <ExcusedIcon /> : <UnexcusedIcon />}
  </button>
);

const ExcusedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#4F3C03"
  >
    <path d="m388-212-56-56 92-92-92-92 56-56 92 92 92-92 56 56-92 92 92 92-56 56-92-92-92 92ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
  </svg>
);

const UnexcusedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#4F3C03"
  >
    <path d="M438-226 296-368l58-58 84 84 168-168 58 58-226 226ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
  </svg>
);

export default SubjectAbsencesInput;
