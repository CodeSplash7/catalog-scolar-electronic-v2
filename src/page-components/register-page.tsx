"use client";
import {
  FathersInitialInput,
  FirstNameInput,
  GradeLevelInput,
  LastNameInput,
  SectionInput
} from "@/components/UserInfoInputs";
import { createNewUser } from "@/mongodb/users";
import Joi from "joi";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { UserClassGradeLevel, UserClassSection } from "@/types/user-types";
import createUsername from "@/general-utils/createUsername";

const formSchema = Joi.object({
  lastName: Joi.string()
    .pattern(/^[a-zA-ZăâîșțĂÂÎȘȚ]+(?: [a-zA-ZăâîșțĂÂÎȘȚ]+)*$/)
    .required()
    .messages({
      "string.pattern.base": "Nume de familie invalid!",
      "any.required": "Numele de familie este obligatoriu.",
      "string.empty": "Numele de familiea este obligatoriu."
    }),
  firstName: Joi.string()
    .pattern(/^[a-zA-ZăâîșțĂÂÎȘȚ]+(?: [a-zA-ZăâîșțĂÂÎȘȚ]+)*$/)
    .required()
    .messages({
      "string.pattern.base": "Nume invalid!",
      "any.required": "Numele este obligatoriu.",
      "string.empty": "Numele este obligatoriu."
    }),
  fatherInitial: Joi.string()
    .pattern(/^[a-zA-ZăâîșțĂÂÎȘȚ]+$/)
    .required()
    .messages({
      "string.pattern.base": "Initiala tatalui este invalida!",
      "any.required": "Initiala tatalui este obligatorie.",
      "string.empty": "Initiala tatalui este obligatorie."
    }),
  gradeLevel: Joi.string().required().messages({
    "any.required": "Clasa este obligatorie.",
    "string.empty": "Clasa este obligatorie."
  }),
  section: Joi.string().required().messages({
    "any.required": "Sectiunea este obligatorie.",
    "string.empty": "Sectiunea este obligatorie."
  }),
  password: Joi.string().required().messages({
    "string.empty": "Parola este obligatorie."
  })
});

export default function RegisterPage() {
  const [formValues, setFormValues] = useState({
    lastName: "",
    firstName: "",
    fatherInitial: "",
    gradeLevel: "",
    section: "",
    password: ""
  });

  const router = useRouter();
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResults = formSchema.validate(formValues);
    console.log(formValues);
    if (validationResults.error)
      return setError(validationResults.error.message);
    setError("");

    const { result: newUser, error: newUserError } = await createNewUser({
      ...formValues,
      gradeLevel: formValues.gradeLevel as UserClassGradeLevel,
      section: formValues.section as UserClassSection,
      username: ""
    });
    if (newUserError || !newUser) return setError("Eroare ciudata!");

    const result = await signIn("credentials", {
      redirect: false,
      username: createUsername(formValues.lastName, formValues.firstName),
      password: formValues.password
    });
    if (result === undefined) return setError("Eroare ciudata!");

    if (result.ok) {
      router.push("/?refresh=true");
    } else {
      setError("Numele de utilizator sau parola a fost introdusa gresit!");
    }
  };

  return (
    <div className="w-full h-fit flex flex-col justify-center px-[32px] py-[32px]">
      <div className="w-full flex justify-center h-fit">
        <div className="w-80 rounded-lg bg-slate-300 p-8 text-gray-100">
          <p className="text-center text-2xl font-bold text-gray-700">
            Înregistrare
          </p>
          <form className="mt-6" onSubmit={handleSubmit}>
            <LastNameInput
              showValue
              showLabel
              userId={null}
              lastName={formValues.lastName}
              onChange={handleChange}
            />
            <FirstNameInput
              showValue
              showLabel
              userId={null}
              firstName={formValues.firstName}
              onChange={handleChange}
            />
            <FathersInitialInput
              showValue
              showLabel
              userId={null}
              fatherInitial={formValues.fatherInitial}
              onChange={handleChange}
            />
            <GradeLevelInput
              showValue
              showLabel
              userId={null}
              gradeLevel={formValues.gradeLevel}
              onChange={handleChange}
            />
            <SectionInput
              showValue
              showLabel
              userId={null}
              section={formValues.section}
              onChange={handleChange}
            />
            <div className="mt-4 text-sm leading-5">
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Parola
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder=""
                value={formValues.password}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-800 bg-gray-100 p-3 text-gray-800 outline-none focus:border-blue-500"
              />
            </div>

            <br />
            <div className="text-red-500">{error}</div>
            <button
              type="submit"
              className="w-full bg-blue-500 p-3 text-center text-gray-100 font-semibold rounded-md"
            >
              Înregistrează-te
            </button>
          </form>

          <div className="flex justify-center mt-4">
            <button
              aria-label="Log in with Google"
              className="rounded-sm p-3 bg-transparent mx-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="h-5 w-5 fill-current text-white"
              >
                {/* Google SVG path */}
              </svg>
            </button>
            <button
              aria-label="Log in with Twitter"
              className="rounded-sm p-3 bg-transparent mx-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="h-5 w-5 fill-current text-white"
              >
                {/* Twitter SVG path */}
              </svg>
            </button>
            <button
              aria-label="Log in with GitHub"
              className="rounded-sm p-3 bg-transparent mx-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="h-5 w-5 fill-current text-white"
              >
                {/* GitHub SVG path */}
              </svg>
            </button>
          </div>
          <p className="text-center text-xs leading-4 text-gray-700 mt-4">
            Ai deja un cont?{" "}
            <Link
              href="/api/auth/signin"
              className="text-black underline hover:underline hover:text-purple-400"
            >
              Autentifică-te
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
