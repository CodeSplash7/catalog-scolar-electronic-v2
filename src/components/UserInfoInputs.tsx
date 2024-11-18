"use client";

import { useState } from "react";
import ModalListInput from "./ModalListInput";
import {
  updateUserFatherInitial,
  updateUserFirstName,
  updateUserGradeLevel,
  updateUserLastName,
  updateUserSection
} from "@/server-utils/user-functions";
import { UserClassGradeLevel, UserClassSection } from "@/types/user-types";
const StringInput = ({
  initialValue,
  saveChanges,
  label,
  placeholder
}: {
  label: string;
  placeholder: string;
  initialValue: string;
  saveChanges: (newValue: string) => void;
}) => {
  const [value, setValue] = useState(initialValue);
  const handleSaveChanges = () => {
    if (initialValue === value) return false;
    saveChanges(value);

    return true;
  };

  const revertChanges = () => {
    if (initialValue === value) return false;
    setValue(initialValue);
    return true;
  };

  return (
    <ModalListInput
      label={null}
      addItem={false}
      deleteAll={false}
      revertChanges={revertChanges}
      saveChanges={handleSaveChanges}
      triggerLabel={label}
      triggerButton={<EditInfoIcon />}
    >
      <input
        type="text"
        className={`bg-slate-200 p-2 text-lg w-full`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
    </ModalListInput>
  );
};

const SelectInput = ({
  initialValue,
  options,
  saveChanges,
  label,
  placeholder
}: {
  label: string;
  placeholder: string;
  initialValue: string;
  options: string[];
  saveChanges: (newValue: string) => void;
}) => {
  const [value, setValue] = useState(initialValue);

  const handleSaveChanges = () => {
    if (initialValue === value) return false;
    saveChanges(value);
    return true;
  };

  const revertChanges = () => {
    if (initialValue === value) return false;
    setValue(initialValue);
    return true;
  };

  return (
    <ModalListInput
      label={null}
      addItem={false}
      deleteAll={false}
      revertChanges={revertChanges}
      saveChanges={handleSaveChanges}
      triggerLabel={label}
      triggerButton={<EditInfoIcon />}
    >
      <select
        className="bg-slate-200 p-2 text-lg w-full"
        value={value ?? "-"}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </ModalListInput>
  );
};

export function LastNameInput({
  userId,
  userLastName
}: {
  userId: string;
  userLastName: string;
}) {
  const [initialValue, setInitialValue] = useState(userLastName);
  const saveLastName = (v: string) => {
    setInitialValue(v);
    (async () => {
      await updateUserLastName(userId, v);
    })();
  };
  return (
    <StringInput
      saveChanges={saveLastName}
      initialValue={initialValue}
      label="Schimba numele de familie"
      placeholder="Numele de familie..."
    />
  );
}

export function FirstNameInput({
  userId,
  userFirstName
}: {
  userId: string;
  userFirstName: string;
}) {
  const [initialValue, setInitialValue] = useState(userFirstName);

  const saveFirstName = (v: string) => {
    setInitialValue(v);
    (async () => {
      await updateUserFirstName(userId, v);
    })();
  };

  return (
    <StringInput
      saveChanges={saveFirstName}
      initialValue={initialValue}
      label="Schimba numele"
      placeholder="Numele..."
    />
  );
}

export function FathersInitialInput({
  userId,
  userFatherInitial
}: {
  userId: string;
  userFatherInitial: string;
}) {
  const [initialValue, setInitialValue] = useState(userFatherInitial);

  const saveInitial = (v: string) => {
    setInitialValue(v);
    (async () => {
      await updateUserFatherInitial(userId, v);
    })();
  };

  return (
    <StringInput
      saveChanges={saveInitial}
      initialValue={initialValue}
      label="Schimba initiala numelui tatalui"
      placeholder="Initiala numelui tatalui"
    />
  );
}

export function GradeLevelInput({
  userId,
  userGradeLevel
}: {
  userId: string;
  userGradeLevel: UserClassGradeLevel;
}) {
  const [initialValue, setInitialValue] = useState(userGradeLevel);

  const saveGradeLevel = (v: string | null) => {
    setInitialValue(v as UserClassGradeLevel);
    (async () => {
      await updateUserGradeLevel(userId, v as UserClassGradeLevel);
    })();
  };

  return (
    <SelectInput
      initialValue={initialValue}
      options={["V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]}
      saveChanges={saveGradeLevel}
      label="Schimba clasa"
      placeholder="Clasa"
    />
  );
}

export function SectionInput({
  userId,
  userSection
}: {
  userId: string;
  userSection: UserClassSection;
}) {
  const [initialValue, setInitialValue] = useState(userSection);

  const saveSection = (v: string | null) => {
    setInitialValue(v as UserClassSection);
    (async () => {
      await updateUserSection(userId, v as UserClassSection);
    })();
  };

  return (
    <SelectInput
      initialValue={initialValue}
      options={["A", "B", "C", "D", "E", "-"]}
      saveChanges={saveSection}
      label="Schimba sectiunea"
      placeholder="Sectiunea"
    />
  );
}

const EditInfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20px"
    viewBox="0 -960 960 960"
    width="20px"
    fill="#2C2B2C"
  >
    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
  </svg>
);
