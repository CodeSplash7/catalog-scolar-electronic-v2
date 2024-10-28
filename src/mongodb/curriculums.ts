"use server";
import { CurriculumDocument } from "@/types/curriculum-types";
import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from "@/mongodb/index";
import {
  SingleDocumentFetchPromise,
  WithObjectId
} from "@/types/fetching-types";
import { handleBasicFetchError } from "@/general-utils/handleBasicFetchError";
// import { UserClass } from "@/types/user-types";
// import { getSubjectNamesByClass } from "@/general-utils/getSubjectNamesByClass";

// Document with different ids type
type CurriculumDocumentWithObjectId = WithObjectId<CurriculumDocument>;

type SingleCurriculumFetchPromiseWithObjectId =
  SingleDocumentFetchPromise<CurriculumDocumentWithObjectId>;

let client: MongoClient, db: Db, curriculums: Collection<CurriculumDocument>;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db("catalog-scolar-electronic"); // Log the database name
    curriculums = db.collection("curriculums");
  } catch (err) {
    throw new Error("Failed to establish the database connection: " + err);
  }
}
(async () => await init())();

export const getCurriculumById = async (
  id: string | undefined | null
): SingleCurriculumFetchPromiseWithObjectId => {
  try {
    if (!curriculums) await init();
    if (!id) throw "Didn't provide a valid id";

    const response = (await curriculums.findOne({
      _id: new ObjectId(id)
    })) as CurriculumDocumentWithObjectId | null;
    if (response === null) throw "Didn't find a curriculum with the given id";

    return { result: response, error: null };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const createNewCurriculum = async (): // userClass: UserClass
SingleCurriculumFetchPromiseWithObjectId => {
  try {
    if (!curriculums) await init();

    // const curriculumSubjectNames: string[] = getSubjectNamesByClass(userClass);

    // const subjects: Subject[] = curriculumSubjectNames.map((n) => {
    //   return {
    //     id: await newObjectId(),
    //     subjectName: n,
    //     grades: [],
    //     absences: [],
    //     activity: { good: 0, bad: 0 },
    //     conduit: 10
    //   };
    // });

    //! need to use 'subjects' variable in the curriculum object

    const newCurriculumDocument: CurriculumDocument = {
      subjects: [],
      overallAverage: 0
    };

    const result = await curriculums.insertOne(newCurriculumDocument);
    const newUser = {
      ...newCurriculumDocument,
      _id: result.insertedId
    } as CurriculumDocumentWithObjectId;

    if (!result.acknowledged) throw "Failed to create new user";
    return { error: null, result: newUser };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const updateCurriculum = async (
  id: string,
  updates: Partial<CurriculumDocument>
): SingleCurriculumFetchPromiseWithObjectId => {
  try {
    if (!curriculums) await init();
    await curriculums.updateOne({ _id: new ObjectId(id) }, { $set: updates });

    // Fetch the updated user document
    const updatedCurriculum = (await curriculums.findOne({
      _id: new ObjectId(id)
    })) as CurriculumDocumentWithObjectId | null;

    if (!updatedCurriculum) throw "Failed finding the updated curriculum";

    return {
      result: updatedCurriculum,
      error: null
    };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};
