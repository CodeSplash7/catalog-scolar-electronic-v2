"use client";

export default function GlobalError({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h1>Something went wrong!</h1>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Reload</button>
      </body>
    </html>
  );
}