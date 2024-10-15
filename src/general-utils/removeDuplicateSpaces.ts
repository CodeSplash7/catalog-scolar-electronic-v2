export default function removeDuplicateSpaces(input: string): string {
  return input.replace(/\s{2,}/g, " ");
}
