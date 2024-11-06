import { Absence, Grade } from "@/types/curriculum-types";

type RemoveButtonProps<T extends Grade | Absence> = {
  list: T[];
  setList: (list: T[]) => void;
  item: T;
  index: number;
};

const RemoveButton = <T extends Grade | Absence>({
  list,
  setList,
  index
}: RemoveButtonProps<T>) => (
  <button
    type="button"
    className="bg-red-500 w-full flex justify-center text-white rounded-lg px-4 py-2"
    onClick={() => {
      const newGrades = list.filter((_, i) => i !== index);
      setList(newGrades);
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="white"
    >
      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
    </svg>
  </button>
);
export default RemoveButton;
