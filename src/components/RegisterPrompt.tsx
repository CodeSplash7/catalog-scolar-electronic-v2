import Link from "next/link";

interface RegisterPromptProps {
  promptText: string;
  linkText: string;
  linkHref: string;
}

export function RegisterPrompt({ promptText, linkText, linkHref }: RegisterPromptProps) {
  return (
    <p className="text-center text-xs leading-4 text-gray-700 mt-4">
      {promptText}{" "}
      <Link href={linkHref} className="text-black underline hover:underline hover:text-purple-400">
        {linkText}
      </Link>
    </p>
  );
}
