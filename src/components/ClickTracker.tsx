"use client";
import React, { ReactNode, cloneElement, useState } from "react";
import { useRouter } from "next/navigation";

// Update the component to accept children and a function as props
const ClickTracker = ({
  children,
  actionType,
  itemIdentifiers
}: {
  children: ReactNode;
  actionType: "edit-subject" | "create-subject";
  itemIdentifiers: { curriculumId: string; subjectId: string | null };
}) => {
  const router = useRouter();
  const { curriculumId, subjectId } = itemIdentifiers;
  const [clickCount, setClickCount] = useState(0);

  let formLink;
  if (actionType === "edit-subject" && subjectId) {
    formLink = `/edit/${curriculumId}/${subjectId}`;
    // console.log("shit");
    // formLink = "./shits";
  }
  if (actionType === "create-subject" && !subjectId) {
    formLink = `./create/${curriculumId}`;
  }

  if (!formLink) return;

  const handleClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    if (newClickCount === 7) {
      console.log("Navigating to:", formLink); // Log the formLink before navigation
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
