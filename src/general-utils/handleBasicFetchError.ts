export const handleBasicFetchError = (err: unknown) => {
  if (typeof err === "string")
    return { result: null, error: "Failed to fetch request: " + err };
  return { result: null, error: "Unexpected error: " + err };
};
