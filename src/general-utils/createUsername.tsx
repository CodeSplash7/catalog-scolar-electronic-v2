export default function createUsername(lastName: string, firstName: string) {
  return `${lastName.toLowerCase()}.${firstName
    .replace(" ", "-")
    .toLowerCase()}`;
}
