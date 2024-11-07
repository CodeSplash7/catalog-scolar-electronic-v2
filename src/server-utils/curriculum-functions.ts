"use server";
import { handleBasicFetchError } from "@/general-utils/handleBasicFetchError";
import { getCurriculumById, updateCurriculum } from "@/mongodb/curriculums";
import { Subject } from "@/types/curriculum-types";
import { ObjectId } from "mongodb";

export const getAllSubjects = async (
  curriculumId: string | null
): Promise<{
  result: Subject[] | null;
  error: string | null;
}> => {
  try {
    if (!curriculumId) throw "Parameter 'curriculumId' is null!";

    const { result: curriculum, error: curriculumError } =
      await getCurriculumById(curriculumId);
    if (curriculumError || !curriculum)
      throw "Error fetching curriculum: " + curriculumError;

    const subjects = curriculum.subjects;

    return { result: subjects, error: null };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const getSubjectById = async (
  curriculumId: string | null,
  subjectId: string | null
): Promise<{
  result: Subject | null;
  error: string | null;
}> => {
  try {
    if (!curriculumId) throw "Parameter 'curriculumId' is null!";
    if (!subjectId) throw "Parameter 'subjectId' is null!";

    const { result: curriculum, error: curriculumError } =
      await getCurriculumById(curriculumId);
    if (curriculumError || !curriculum)
      throw "Error fetching curriculum: " + curriculumError;

    const subject = curriculum.subjects.find(
      (subject) => subject.id.$oid === subjectId
    );

    if (!subject) {
      throw new Error(
        `Subject with ID ${subjectId} not found in the curriculum.`
      );
    }

    return { result: subject, error: null };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const updateSubject = async (
  curriculumId: string,
  subjectId: string | null,
  newSubject: Subject
): Promise<{
  result: Subject | null;
  error: string | null;
}> => {
  try {
    if (!curriculumId) throw "Parameter 'curriculumId' is null!";
    if (!subjectId) throw "Parameter 'subjectId' is null!";
    if (!newSubject) throw "Parameter 'newSubject' is null!";

    const { result: curriculum, error: curriculumError } =
      await getCurriculumById(curriculumId);
    if (curriculumError || !curriculum)
      throw "Error fetching curriculum: " + curriculumError;

    const subjectIndex = curriculum.subjects.findIndex(
      (subject) => subject.id.$oid === subjectId
    );

    if (subjectIndex === -1)
      throw `Subject with ID ${subjectId} not found in the curriculum.`;

    curriculum.subjects[subjectIndex] = {
      ...newSubject,
      id: { $oid: new ObjectId(subjectId).toString() }
    };

    const { result: updatedCurriculum, error: updateError } =
      await updateCurriculum(curriculumId, {
        subjects: curriculum.subjects
      });

    if (updateError || !updatedCurriculum) {
      throw new Error("Error updating curriculum: " + updateError);
    }

    return {
      result: curriculum.subjects[subjectIndex],
      error: null
    };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const deleteSubject = async (
  curriculumId: string,
  subjectId: string | null
): Promise<{
  result: null;
  error: string | null;
}> => {
  try {
    if (!curriculumId) throw "Parameter 'curriculumId' is null!";
    if (!subjectId) throw "Parameter 'subjectId' is null!";

    const { result: curriculum, error: curriculumError } =
      await getCurriculumById(curriculumId);
    if (curriculumError || !curriculum)
      throw "Error fetching curriculum: " + curriculumError;

    const subjectIndex = curriculum.subjects.findIndex(
      (subject) => subject.id.$oid === subjectId
    );

    if (subjectIndex === -1)
      throw `Subject with ID ${subjectId} not found in the curriculum.`;

    // Remove the subject from the subjects array
    curriculum.subjects.splice(subjectIndex, 1);

    // Update the curriculum without the deleted subject
    const { result: updatedCurriculum, error: updateError } =
      await updateCurriculum(curriculumId, {
        subjects: curriculum.subjects
      });

    if (updateError || !updatedCurriculum) {
      throw new Error("Error updating curriculum: " + updateError);
    }

    return { result: null, error: null }; // Return null to indicate success
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const createSubject = async (
  curriculumId: string | null,
  newSubject: Subject | null
): Promise<{
  result: null;
  error: string | null;
}> => {
  try {
    if (!curriculumId) throw "Parameter 'curriculumId' is null!";
    if (!newSubject) throw "Parameter 'newSubject' is null!";

    const { result: curriculum, error: curriculumError } =
      await getCurriculumById(curriculumId);
    if (curriculumError || !curriculum)
      throw "Error fetching curriculum: " + curriculumError;

    curriculum.subjects.push(newSubject);

    const { result: updatedCurriculum, error: updateError } =
      await updateCurriculum(curriculumId, {
        subjects: curriculum.subjects
      });
    if (updateError || !updatedCurriculum) {
      throw new Error("Error updating curriculum: " + updateError);
    }
    return { result: null, error: null }; // Return null to indicate success
  } catch (err) {
    return handleBasicFetchError(err);
  }
};
