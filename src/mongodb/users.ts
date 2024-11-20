"use server";
import {
  UserClass,
  UserClassGradeLevel,
  UserClassSection,
  UserDocument
} from "@/types/user-types";
import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from "@/mongodb/index";
import { hashPassword } from "@/server-utils/password-functions";
import {
  MultipleDocumentFetchPromise,
  SingleDocumentFetchPromise,
  WithObjectId
} from "@/types/fetching-types";
import { handleBasicFetchError } from "@/general-utils/handleBasicFetchError";
import removeDuplicateSpaces from "@/general-utils/removeDuplicateSpaces";
import { generateUsername } from "@/general-utils/generateUsername";
import { createNewCurriculum } from "./curriculums";

// Document with different ids type
type UserDocumentWithObjectId = WithObjectId<UserDocument>;

// Fetch return types
type MultipleUsersFetchPromiseWithObjectId =
  MultipleDocumentFetchPromise<UserDocumentWithObjectId>;
type SingleUserFetchPromiseWithObjectId =
  SingleDocumentFetchPromise<UserDocumentWithObjectId>;

let client: MongoClient, db: Db, users: Collection<UserDocument>;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db("catalog-scolar-electronic"); // Log the database name
    users = db.collection("users");
  } catch (err) {
    throw new Error("Failed to establish the database connection: " + err);
  }
}
(async () => await init())();

export const getUsers = async (
  projection?: Record<string, number>
): MultipleUsersFetchPromiseWithObjectId => {
  try {
    if (!users) await init();

    const response = await users.find({}, { projection }).toArray();
    const result = response.map((u) => {
      const newUser = {
        ...u,
        _id: new ObjectId()
      } as UserDocumentWithObjectId;
      return newUser;
    });

    return { result, error: null };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const getUserByUsername = async (
  username: string | undefined | null
): SingleUserFetchPromiseWithObjectId => {
  try {
    if (!users) await init();
    if (!username) throw "Invalid username";

    const response = (await users.findOne({
      "profile.username": username
    })) as UserDocumentWithObjectId | null;

    if (response === null)
      throw "Didn't find a user with the given username: " + username;

    return { result: response, error: null };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const getUserByEmail = async (
  email: string | undefined | null
): SingleUserFetchPromiseWithObjectId => {
  try {
    if (!users) await init();
    if (!email) throw "Didn't provide a valid email";

    const response = (await users.findOne({
      "account.email": email
    })) as UserDocumentWithObjectId | null;
    if (response === null) throw "Didn't find a user with the given email";

    return { result: response, error: null };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const getUserById = async (
  id: string | undefined | null
): SingleUserFetchPromiseWithObjectId => {
  try {
    if (!users) await init();
    if (!id) throw "Didn't provide a valid id";

    const response = (await users.findOne({
      _id: new ObjectId(id)
    })) as UserDocumentWithObjectId | null;
    if (response === null) throw "Didn't find a user with the given id";

    // const result = stringifyId(response);
    return { result: response, error: null };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const createNewUser = async (newUserInfo: {
  password: string;
  username: string;
  // userClass: UserClass;
  gradeLevel: UserClassGradeLevel;
  section: UserClassSection;
  firstName: string;
  lastName: string;
  fatherInitial: string;
}): SingleUserFetchPromiseWithObjectId => {
  try {
    if (!users) await init();
    const {
      username,
      password,
      gradeLevel,
      section,
      firstName,
      lastName,
      fatherInitial: fathersInitial
    } = newUserInfo;
    const { salt, hash } = hashPassword(password);

    if ((await getUserByUsername(username)).result) throw "Username is taken!";
    if ((await getUserByEmail(username)).result)
      throw "This email is already being used!";

    const validFirstName = removeDuplicateSpaces(firstName);
    const validLastName = removeDuplicateSpaces(lastName);
    const validFathersInitial = removeDuplicateSpaces(fathersInitial);

    const { result: newCurriculum, error: newCurriculumError } =
      await createNewCurriculum();
    if (newCurriculumError || !newCurriculum)
      throw "Failed to create new curriculum: " + newCurriculumError;

    const newUserDocument: UserDocument = {
      profile: {
        userClass: { gradeLevel, section },
        firstName: validFirstName,
        lastName: validLastName,
        fathersInitial: validFathersInitial,
        username: generateUsername(validFirstName, validLastName),
        curriculumId: newCurriculum?._id.toString()
      },
      account: {
        password: { salt, hash },
        subscriptionId: "" // TODO: Gotta handle this somehow too
      }
    };

    const result = await users.insertOne(newUserDocument);
    const newUser = {
      ...newUserDocument,
      _id: new ObjectId()
    } as UserDocumentWithObjectId | null;

    if (!result.acknowledged) throw "Failed to create new user";
    return { error: null, result: newUser };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const updateUser = async (
  id: string,
  updates: Partial<UserDocument>
): SingleUserFetchPromiseWithObjectId => {
  try {
    if (!users) await init();
    await users.updateOne({ _id: new ObjectId(id) }, { $set: updates });

    // Fetch the updated user document
    const updatedUser = (await users.findOne({
      _id: new ObjectId(id)
    })) as UserDocumentWithObjectId | null;

    if (!updatedUser) throw "Couldn't find the updated blog!";

    return {
      result: { ...updatedUser, _id: new ObjectId() },
      error: null
    };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};
