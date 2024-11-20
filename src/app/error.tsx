"use client";

export default function GlobalError({
  error,
  reset
}: {
  error: Error | string;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h1>Something went wrong!</h1>
        <p>{error instanceof Error ? error?.message : error}</p>
        <button onClick={() => reset()}>Reload</button>
      </body>
    </html>
  );
}
