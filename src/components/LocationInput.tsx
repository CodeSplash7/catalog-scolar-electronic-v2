"use client";

import { Subject } from "@/types/curriculum-types";
import ModalListInput from "./ModalListInput";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  DragEndEvent,
  TouchSensor
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates
} from "@dnd-kit/sortable";
import SortableSubjectItem from "@components/SortableSubjectItem";
import { useEffect, useState } from "react";

export default function LocationInput({
  setAllSubjects,
  allSubjects,
  subject
}: {
  setAllSubjects: (subjects: Subject[]) => void;
  allSubjects: Subject[];
  subject: Subject;
}) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouchSupport = () => {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    };

    checkTouchSupport();
    window.addEventListener("resize", checkTouchSupport);
    return () => window.removeEventListener("resize", checkTouchSupport);
  }, []);
  const sensors = useSensors(
    useSensor(isTouchDevice ? TouchSensor : PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = allSubjects.findIndex(
        (item) => item.id.$oid === active.id
      );
      const newIndex = allSubjects.findIndex(
        (item) => item.id.$oid === over.id
      );
      const newItems = arrayMove(allSubjects, oldIndex, newIndex);
      setAllSubjects(newItems);
      setAllSubjects(newItems); // Update the parent state
    }
  };

  return (
    <ModalListInput
      addItem={false}
      label="Poziția materiei"
      triggerLabel="Modifica poziția materiei"
    >
      <div className="w-full flex flex-col h-fit">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={allSubjects.map((item) => item.id.$oid)}
            strategy={verticalListSortingStrategy}
          >
            <ul>
              {allSubjects.map((s) => (
                <SortableSubjectItem
                  key={s.id.$oid}
                  id={s.id.$oid}
                  isActive={subject.id.$oid === s.id.$oid}
                  subjectName={s.subjectName}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
    </ModalListInput>
  );
}
