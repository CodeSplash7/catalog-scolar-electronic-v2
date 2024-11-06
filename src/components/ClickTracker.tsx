"use client";
// hooks
import React, { ReactNode, cloneElement, useState } from "react";
import { useRouter } from "next/navigation";
import routes from "@/general-utils/page-routes";

type ClickTrackerProps = {
  children: ReactNode;
  actionType: "edit-subject" | "create-subject";
  itemIdentifiers: { curriculumId: string; subjectId: string | null };
};
// Update the component to accept children and a function as props
const ClickTracker: React.FC<ClickTrackerProps> = ({
  children,
  actionType,
  itemIdentifiers
}) => {
  const router = useRouter();
  const { curriculumId, subjectId } = itemIdentifiers;
  const [clickCount, setClickCount] = useState(0);

  let formLink;
  if (actionType === "edit-subject" && subjectId)
    formLink = routes.edit(curriculumId, subjectId);

  if (actionType === "create-subject" && !subjectId)
    formLink = routes.create(curriculumId);

  if (!formLink) return;

  const handleClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    if (newClickCount === 7) {
      router.push(formLink);
      setClickCount(0);
    }
  };

  const childWithClickHandler = (
    <div onClick={handleClick}>
      {React.Children.map(children, (child) => {
        return cloneElement(child as React.ReactElement);
      })}
    </div>
  );

  return <>{childWithClickHandler} </>;
};

export default ClickTracker;
