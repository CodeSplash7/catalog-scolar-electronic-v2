"use server";
import { CurriculumDocument, SubjectDocument } from "@/types/curriculum-types";
import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from "@/mongodb/index";
import {
  SingleDocumentFetchPromise,
  WithObjectId,
  WithStringId
} from "@/types/fetching-types";
import { stringifyId } from "@/general-utils/stringify-ids";
import { handleBasicFetchError } from "@/general-utils/handleBasicFetchError";
import { UserClass } from "@/types/user-types";
import { getSubjectNamesByClass } from "@/general-utils/getSubjectNamesByClass";

// Document with different ids type
type CurriculumDocumentWithObjectId = WithObjectId<CurriculumDocument>;
type CurriculumDocumentWithStringId = WithStringId<CurriculumDocument>;

type SingleCurriculumFetchPromise<
  T extends CurriculumDocumentWithObjectId | CurriculumDocumentWithStringId
> = SingleDocumentFetchPromise<T>;

// Readablity alias types
export type SingleCurriculumFetchPromiseWithStringId =
  SingleCurriculumFetchPromise<CurriculumDocumentWithStringId>;

let client: MongoClient, db: Db, curriculums: Collection<CurriculumDocument>;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db(); // Log the database name
    curriculums = db.collection("curriculums");
  } catch (err) {
    throw new Error("Failed to establish the database connection");
  }
}
(async () => await init())();

export const getCurriculumById = async (
  id: string | undefined | null
): SingleCurriculumFetchPromiseWithStringId => {
  try {
    if (!curriculums) await init();
    if (!id) throw "Didn't provide a valid id";

    const response = (await curriculums.findOne({
      _id: new ObjectId(id)
    })) as CurriculumDocumentWithObjectId;
    if (response === null) throw "Didn't find a curriculum with the given id";

    const result = stringifyId(response);
    return { result, error: null };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const createNewCurriculum = async (
  userClass: UserClass
): SingleCurriculumFetchPromiseWithStringId => {
  try {
    if (!curriculums) await init();

    const curriculumSubjectNames: string[] = getSubjectNamesByClass(userClass);

    const subjects: WithStringId<SubjectDocument>[] =
      curriculumSubjectNames.map((n) => {
        return {
          _id: new ObjectId().toString(),
          subjectName: n,
          grades: [],
          absences: [],
          activity: { good: 0, bad: 0 },
          conduit: 10
        };
      });

    const newCurriculumDocument: CurriculumDocument = {
      absences: {
        total: 0,
        excused: 0
      },
      subjects
    };

    const result = await curriculums.insertOne(newCurriculumDocument);
    const newUser = {
      ...newCurriculumDocument,
      _id: result.insertedId.toString()
    } as CurriculumDocumentWithStringId;

    if (!result.acknowledged) throw "Failed to create new user";
    return { error: null, result: newUser };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const updateCurriculum = async (
  id: string,
  updates: Partial<CurriculumDocument>
): SingleCurriculumFetchPromiseWithStringId => {
  try {
    if (!curriculums) await init();
    await curriculums.updateOne({ _id: new ObjectId(id) }, { $set: updates });

    // Fetch the updated user document
    const updatedCurriculum = (await curriculums.findOne({
      _id: new ObjectId(id)
    })) as CurriculumDocumentWithObjectId;

    return {
      result: { ...updatedCurriculum, _id: updatedCurriculum._id.toString() },
      error: null
    };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};
