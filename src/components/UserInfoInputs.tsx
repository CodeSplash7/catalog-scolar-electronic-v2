"use client";

import { ChangeEvent, useState } from "react";
import ModalListInput from "./ModalListInput";
import {
  updateUserFatherInitial,
  updateUserFirstName,
  updateUserGradeLevel,
  updateUserLastName,
  updateUserSection
} from "@/server-utils/user-functions";
import { UserClassGradeLevel, UserClassSection } from "@/types/user-types";
export const StringInput = ({
  initialValue,
  saveChanges,
  label,
  placeholder,
  name,
  onChange,
  headLabel,
  showValue
}: {
  headLabel: string | null;
  showValue: boolean;
  name: string;
  label: string;
  placeholder: string;
  initialValue: string;
  saveChanges: (newValue: string) => void;
  onChange: null | ((e: React.ChangeEvent<HTMLInputElement>) => void);
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
      label={headLabel}
      addItem={false}
      deleteAll={false}
      revertChanges={revertChanges}
      saveChanges={handleSaveChanges}
      triggerLabel={label}
      triggerButton={
        <div className={`flex gap-[8px]`}>
          {showValue && (
            <div className={`text-slate-700 underline font-bold`}>
              {value || "___"}
            </div>
          )}
          <EditInfoIcon />
        </div>
      }
    >
      <input
        name={name}
        type="text"
        className={`bg-slate-200 p-2 text-lg w-full`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e);
        }}
      />
    </ModalListInput>
  );
};

export const SelectInput = ({
  initialValue,
  options,
  saveChanges,
  label,
  placeholder,
  onChange,
  headLabel,
  showValue,
  name
}: {
  headLabel: string | null;
  showValue: boolean;
  label: string;
  name: string;
  placeholder: string;
  initialValue: string;
  options: string[];
  saveChanges: (newValue: string) => void;
  onChange:
    | null
    | ((
        e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
      ) => void);
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
      label={headLabel}
      addItem={false}
      deleteAll={false}
      revertChanges={revertChanges}
      saveChanges={handleSaveChanges}
      triggerLabel={label}
      triggerButton={
        <div className={`flex gap-[8px]`}>
          {showValue && (
            <div className={`text-slate-700 underline font-bold`}>
              {value || "___"}
            </div>
          )}
          <EditInfoIcon />
        </div>
      }
    >
      <select
        name={name}
        className="bg-slate-200 p-2 text-lg w-full"
        value={value ?? "-"}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e);
        }}
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
  lastName,
  onChange,
  showLabel,
  showValue
}: {
  userId: string | null;
  showLabel: boolean;
  showValue: boolean;
  lastName: string;
  onChange: null | ((e: React.ChangeEvent<HTMLInputElement>) => void);
}) {
  const [initialValue, setInitialValue] = useState(lastName);
  const saveLastName = (v: string) => {
    setInitialValue(v);
    async function update() {
      if (userId) await updateUserLastName(userId, v);
    }
    update();
  };
  return (
    <StringInput
      onChange={onChange}
      name={"lastName"}
      saveChanges={saveLastName}
      initialValue={initialValue}
      headLabel={showLabel ? "Numele de familie" : null}
      showValue={showValue}
      label="Schimba numele de familie"
      placeholder="Numele de familie..."
    />
  );
}

export function FirstNameInput({
  userId,
  firstName,
  onChange,
  showLabel,
  showValue
}: {
  userId: string | null;
  showLabel: boolean;
  showValue: boolean;
  firstName: string;
  onChange: null | ((e: React.ChangeEvent<HTMLInputElement>) => void);
}) {
  const [initialValue, setInitialValue] = useState(firstName);

  const saveFirstName = (v: string) => {
    setInitialValue(v);
    async function update() {
      if (userId) await updateUserFirstName(userId, v);
    }
    update();
  };

  return (
    <StringInput
      showValue={showValue}
      headLabel={showLabel ? "Numele" : null}
      onChange={onChange}
      name="firstName"
      saveChanges={saveFirstName}
      initialValue={initialValue}
      label="Schimba numele"
      placeholder="Numele..."
    />
  );
}

export function FathersInitialInput({
  userId,
  fatherInitial,
  onChange,
  showLabel,
  showValue
}: {
  userId: string | null;
  showLabel: boolean;
  showValue: boolean;
  fatherInitial: string;
  onChange: null | ((e: React.ChangeEvent<HTMLInputElement>) => void);
}) {
  const [initialValue, setInitialValue] = useState(fatherInitial);

  const saveInitial = (v: string) => {
    setInitialValue(v);
    async function update() {
      if (userId) await updateUserFatherInitial(userId, v);
    }
    update();
  };

  return (
    <StringInput
      showValue={showValue}
      headLabel={showLabel ? "Initiala tatalui" : null}
      onChange={onChange}
      name="fatherInitial"
      saveChanges={saveInitial}
      initialValue={initialValue}
      label="Schimba initiala numelui tatalui"
      placeholder="Initiala numelui tatalui"
    />
  );
}

export function GradeLevelInput({
  userId,
  gradeLevel,
  onChange,
  showLabel,
  showValue
}: {
  userId: string | null;
  showLabel: boolean;
  showValue: boolean;
  gradeLevel: string;
  onChange:
    | null
    | ((
        e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
      ) => void);
}) {
  const [initialValue, setInitialValue] = useState(gradeLevel);

  const saveGradeLevel = (v: string | null) => {
    setInitialValue(v as UserClassGradeLevel);
    async function update() {
      if (userId) await updateUserGradeLevel(userId, v as UserClassGradeLevel);
    }
    update();
  };

  return (
    <SelectInput
      name="gradeLevel"
      showValue={showValue}
      headLabel={showLabel ? "Clasa" : null}
      onChange={onChange}
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
  section,
  onChange,
  showLabel,
  showValue
}: {
  userId: string | null;
  showLabel: boolean;
  showValue: boolean;
  section: string;
  onChange:
    | null
    | ((
        e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
      ) => void);
}) {
  const [initialValue, setInitialValue] = useState(section);

  const saveSection = (v: string | null) => {
    setInitialValue(v as UserClassGradeLevel);
    async function update() {
      if (userId) await updateUserSection(userId, v as UserClassSection);
    }

    update();
  };

  return (
    <SelectInput
      name="section"
      showValue={showValue}
      headLabel={showLabel ? "Sectiunea" : null}
      onChange={onChange}
      initialValue={initialValue}
      options={["A", "B", "C", "D", "E", "-"]}
      saveChanges={saveSection}
      label="Schimba sectiunea"
      placeholder="Sectiunea"
    />
  );
}

export const UsernameInput = ({
  username,
  onChange
}: {
  username: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
}) => {
  return (
    <div className="mt-1 text-sm leading-5">
      <label htmlFor="username" className="block mb-1 text-gray-700">
        Nume de utilizator
      </label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder=""
        value={username}
        onChange={onChange}
        className="w-full rounded-md border border-gray-800 bg-gray-100 p-3 text-gray-800 outline-none focus:border-blue-500"
      />
    </div>
  );
};

export const PasswordInput = ({
  password,
  onChange
}: {
  password: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
}) => {
  return (
    <div className="mt-4 text-sm leading-5">
      <label htmlFor="password" className="block text-gray-700 mb-1">
        Parola
      </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder=""
        value={password}
        onChange={onChange}
        className="w-full rounded-md border border-gray-800 bg-gray-100 p-3 text-gray-800 outline-none focus:border-blue-500"
      />
    </div>
  );
};

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
