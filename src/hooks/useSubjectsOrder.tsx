"use client";

import { getAllSubjects } from "@/server-utils/curriculum-functions";
import { Subject } from "@/types/curriculum-types";
import { useEffect, useState } from "react";

const useSubjectsOrder = (
  curriculumId: string,
  additionalSubject?: Subject
) => {
  const [subjectsOrder, setSubjectsOrder] = useState<Subject[]>([]);
  const [finalSubjectsOrder, setFinalSubjectsOrder] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchAllSubjects = async () => {
      const { result, error } = await getAllSubjects(curriculumId);
      if (error || !result) return;
      if (additionalSubject) result.unshift(additionalSubject);

      setSubjectsOrder(result);
      setFinalSubjectsOrder(result);
    };
    fetchAllSubjects();
  }, []);

  return {
    value: subjectsOrder,
    set: setSubjectsOrder,
    finalValue: finalSubjectsOrder,
    setFinal: setFinalSubjectsOrder
  };
};
export default useSubjectsOrder;
