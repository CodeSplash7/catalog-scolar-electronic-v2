"use client";
import { AuthLayout } from "@/components/AuthLayout";
import { AuthForm } from "@/components/AuthForm";
import { RegisterPrompt } from "@/components/RegisterPrompt";
import {
  LastNameInput,
  FirstNameInput,
  FathersInitialInput,
  GradeLevelInput,
  SectionInput,
  PasswordInput
} from "@/components/UserInfoInputs";
import useFormValues from "@/hooks/useFormValues";
import Joi from "joi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createNewUser } from "@/mongodb/users";
import createUsername from "@/general-utils/createUsername";
import { UserClassGradeLevel, UserClassSection } from "@/types/user-types";

export default function RegisterPage() {
  const router = useRouter();

  const [formValues, handleChange] = useFormValues({
    lastName: "",
    firstName: "",
    fatherInitial: "",
    gradeLevel: "",
    section: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formSchema = Joi.object({
      lastName: Joi.string().required(),
      firstName: Joi.string().required(),
      fatherInitial: Joi.string().required(),
      gradeLevel: Joi.string().required(),
      section: Joi.string().required(),
      password: Joi.string().required()
    });

    const validationResults = formSchema.validate(formValues);
    if (validationResults.error) {
      setError(validationResults.error.message);
      return;
    }

    const { result: newUser, error: newUserError } = await createNewUser({
      ...formValues,
      gradeLevel: formValues.gradeLevel as UserClassGradeLevel,
      section: formValues.section as UserClassSection,
      username: createUsername(formValues.lastName, formValues.firstName)
    });
    if (newUserError || !newUser) {
      setError("Eroare ciudata: " + newUserError);
      return;
    }

    router.push("/?refresh=true");
  };

  return (
    <AuthLayout title="Înregistrare">
      <AuthForm
        inputs={
          <>
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
            <PasswordInput
              onChange={handleChange}
              password={formValues.password}
            />
          </>
        }
        onSubmit={handleSubmit}
        error={error}
        buttonLabel="Înregistrează-te"
      />
      <RegisterPrompt
        promptText="Ai deja un cont?"
        linkText="Autentifică-te"
        linkHref="/api/auth/signin"
      />
    </AuthLayout>
  );
}
