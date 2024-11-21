import { useState } from "react";

export default function useFormValues<T extends { [key: string]: string }>(
  formValues: T
) {
  const [form, setForm] = useState(formValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };
  return [form as T, handleChange] as [
    T,
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => void
  ];
}
