export function generateUsername(firstName: string, lastName: string): string {
  const formattedLastName = lastName.toLowerCase();
  const formattedFirstName = firstName.toLowerCase().split(" ").join("-"); // Join multiple first names with a hyphen
  return `${formattedLastName}.${formattedFirstName}`;
}
