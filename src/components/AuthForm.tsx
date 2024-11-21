interface AuthFormProps {
  inputs: React.ReactNode; // Allows both custom components and standard inputs
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  buttonLabel: string;
}

export function AuthForm({
  inputs,
  onSubmit,
  error,
  buttonLabel
}: AuthFormProps) {
  return (
    <form className="mt-6" onSubmit={onSubmit}>
      {inputs}
      <br />
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-500 p-3 text-center text-gray-100 font-semibold rounded-md"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
