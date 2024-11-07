import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortableSubjectItemProps = {
  id: string;
  isActive: boolean;
  subjectName: string;
};

export default function SortableSubjectItem({
  id,
  isActive,
  subjectName
}: SortableSubjectItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px",
    margin: "4px 0",
    borderRadius: "4px",
    backgroundColor: isActive ? "#3b82f6" : "#f9f9f9",
    color: isActive ? "#ffffff" : "#000000",
    border: "1px solid #ccc",
    display: "flex",
    justifyContent: "space-between",
    overflowX: "hidden"
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(isActive && listeners)}
    >
      <div>{subjectName}</div>
      {isActive && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="white"
        >
          <path d="M160-360v-80h640v80H160Zm0-160v-80h640v80H160Z" />
        </svg>
      )}
    </li>
  );
}
