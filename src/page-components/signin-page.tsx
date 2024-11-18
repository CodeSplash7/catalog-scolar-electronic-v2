"use client";
import Joi from "joi";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const formSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-ZăâîșțĂÂÎȘȚ.-]+$/)
    .required()
    .messages({
      "string.pattern.base": "Nume de utilizator invalid!",
      "any.required": "Numele de utilizator este obligatoriu.",
      "string.empty": "Numele de utilizator este obligatoriu."
    }),
  password: Joi.string().required().messages({
    "string.empty": "Parola este obligatorie."
  })
});

export default function SignInPage() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: ""
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResults = formSchema.validate(formValues);
    if (validationResults.error)
      return setError(validationResults.error.message);

    const result = await signIn("credentials", {
      redirect: false,
      username: formValues.username,
      password: formValues.password
    });
    if (result === undefined) return setError("Eroare ciudata!");

    if (result.ok) {
      router.push("/");
    } else {
      setError("Numele de utilizator sau parola a fost introdusa gresit!");
    }
  };

  return (
    <div className="w-full h-[calc(100vh-55px)] flex flex-col justify-center px-[32px] py-[32px]">
      <div className="w-full flex justify-center h-fit">
        <div className="w-80 rounded-lg bg-slate-300 p-8 text-gray-100">
          <p className="text-center text-2xl font-bold text-gray-700">
            Autentificare
          </p>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mt-1 text-sm leading-5">
              <label htmlFor="username" className="block mb-1 text-gray-700">
                Nume de utilizator
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder=""
                value={formValues.username}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-800 bg-gray-100 p-3 text-gray-800 outline-none focus:border-blue-500"
              />
            </div>
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
              Conectează-te
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
            Nu ai un cont?{" "}
            <a
              href="#"
              className="text-black underline hover:underline hover:text-purple-400"
            >
              Înregistrează-te
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
