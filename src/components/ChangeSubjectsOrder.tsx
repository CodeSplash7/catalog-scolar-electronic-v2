"use client";

import useSubjectsOrder from "@/hooks/useSubjectsOrder";
import ModalListInput from "./ModalListInput";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import SortableSubjectItem from "./SortableSubjectItem";
import { useEffect, useState } from "react";
import { updateCurriculum } from "@/mongodb/curriculums";

export default function ChangeSubjectsOrder({
  curriculumId
}: {
  curriculumId: string;
}) {
  const subjectsOrder = useSubjectsOrder(curriculumId);
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

  const saveAllSubjects = () => {
    if (
      JSON.stringify(subjectsOrder.value) ===
      JSON.stringify(subjectsOrder.finalValue)
    )
      return false;
    console.log("save att");
    const savedSubjects = subjectsOrder.value.map((g) => {
      return { ...g };
    });

    subjectsOrder.setFinal(savedSubjects);
    (async () => {
      await updateCurriculum(curriculumId, {
        subjects: savedSubjects
      });
    })();
    return true;
  };

  return (
    <ModalListInput
      revertChanges={revertsubjectsOrder}
      saveChanges={saveAllSubjects}
      addItem={false}
      deleteAll={false}
      triggerLabel={"Modifică ordinea materiilor"}
      label={null}
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
                  isActive={true}
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
