"use client";
import { AuthLayout } from "@/components/AuthLayout";
import { AuthForm } from "@/components/AuthForm";
import { RegisterPrompt } from "@/components/RegisterPrompt";
import useFormValues from "@/hooks/useFormValues";
import Joi from "joi";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordInput, UsernameInput } from "@/components/UserInfoInputs";

export default function SignInPage() {
  const router = useRouter();

  const [formValues, handleChange] = useFormValues({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResults = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
    }).validate(formValues);

    if (validationResults.error) {
      setError(validationResults.error.message);
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      ...formValues
    });
    if (result?.ok) {
      router.push("/?refresh=true");
    } else {
      setError("Login failed.");
    }
  };

  return (
    <AuthLayout title="Autentificare">
      <AuthForm
        inputs={
          <>
            <UsernameInput
              onChange={handleChange}
              username={formValues.username}
            />
            <PasswordInput
              onChange={handleChange}
              password={formValues.password}
            />
          </>
        }
        onSubmit={handleSubmit}
        error={error}
        buttonLabel="Conectează-te"
      />
      <RegisterPrompt
        promptText="Nu ai un cont?"
        linkText="Înregistrează-te"
        linkHref="/api/auth/register"
      />
    </AuthLayout>
  );
}
