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
  subjectsOrder,
  subject
}: {
  subjectsOrder: {
    value: Subject[];
    set: (subjects: Subject[]) => void;
    finalValue: Subject[];
    setFinal: (subjects: Subject[]) => void;
  };
  subject: Subject;
}) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const revertsubjectsOrder = () => {
    if (
      JSON.stringify(subjectsOrder.value) ===
      JSON.stringify(subjectsOrder.finalValue)
    )
      return false;
    subjectsOrder.set(
      subjectsOrder.finalValue.map((s) => {
        return { ...s };
      })
    );
    return true;
  };

  const saveAllSubject = () => {
    if (
      JSON.stringify(subjectsOrder) === JSON.stringify(subjectsOrder.finalValue)
    )
      return false;
    subjectsOrder.setFinal(
      subjectsOrder.value.map((g) => {
        return { ...g };
      })
    );
    return true;
  };

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
      const oldIndex = subjectsOrder.value.findIndex(
        (item) => item.id.$oid === active.id
      );
      const newIndex = subjectsOrder.value.findIndex(
        (item) => item.id.$oid === over.id
      );
      const newItems = arrayMove(subjectsOrder.value, oldIndex, newIndex);
      subjectsOrder.set(newItems);
      subjectsOrder.set(newItems); // Update the parent state
    }
  };

  return (
    <ModalListInput
      addItem={false}
      deleteAll={false}
      revertChanges={revertsubjectsOrder}
      saveChanges={saveAllSubject}
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
            items={subjectsOrder.value.map((item) => item.id.$oid)}
            strategy={verticalListSortingStrategy}
          >
            <ul>
              {subjectsOrder.value.map((s) => (
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
