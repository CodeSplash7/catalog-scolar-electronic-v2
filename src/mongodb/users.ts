"use server";
import { UserClass, UserDocument } from "@/types/user-types";
import { Collection, Db, MongoClient, ObjectId, WithId } from "mongodb";
import clientPromise from "@/mongodb/index";
import { hashPassword } from "@/server-utils/password-functions";
import {
  MultipleDocumentFetchPromise,
  SingleDocumentFetchPromise,
  WithObjectId,
  WithStringId
} from "@/types/fetching-types";
import { stringifyId, stringifyIds } from "@/general-utils/stringify-ids";
import { handleBasicFetchError } from "@/general-utils/handleBasicFetchError";
import removeDuplicateSpaces from "@/general-utils/removeDuplicateSpaces";
import { generateUsername } from "@/general-utils/generateUsername";

// Document with different ids type
type UserDocumentWithObjectId = WithObjectId<UserDocument>;
type UserDocumentWithStringId = WithStringId<UserDocument>;

// Fetch return types
type MultipleUsersFetchPromise<
  T extends UserDocumentWithObjectId | UserDocumentWithStringId
> = MultipleDocumentFetchPromise<T>;
type SingleUserFetchPromise<
  T extends UserDocumentWithObjectId | UserDocumentWithStringId
> = SingleDocumentFetchPromise<T>;

// Readablity alias types
type MultipleUsersFetchPromiseWithStringId =
  MultipleUsersFetchPromise<UserDocumentWithStringId>;

export type SingleUserFetchPromiseWithStringId =
  SingleUserFetchPromise<UserDocumentWithStringId>;

let client: MongoClient, db: Db, users: Collection<UserDocument>;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db(); // Log the database name
    users = db.collection("users");
  } catch (err) {
    throw new Error("Failed to establish the database connection: " + err);
  }
}
(async () => await init())();

export const getUsers = async (
  projection?: Record<string, number>
): MultipleUsersFetchPromiseWithStringId => {
  try {
    if (!users) await init();

    const response = (await users
      .find({}, { projection })
      .toArray()) as UserDocumentWithObjectId[];

    const result = stringifyIds(response);

    return { result, error: null };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const getUserByUsername = async (
  username: string | undefined | null
): SingleUserFetchPromiseWithStringId => {
  try {
    if (!users) await init();
    if (!username) throw "Invalid username";

    const response = (await users.findOne({
      "profile.username": username
    })) as UserDocumentWithObjectId;

    if (response === null)
      throw "Didn't find a user with the given username: " + username;

    const result = stringifyId(response);
    return { result, error: null };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const getUserByEmail = async (
  email: string | undefined | null
): SingleUserFetchPromiseWithStringId => {
  try {
    if (!users) await init();
    if (!email) throw "Didn't provide a valid email";

    const response = (await users.findOne({
      "account.email": email
    })) as UserDocumentWithObjectId;
    if (response === null) throw "Didn't find a user with the given email";

    const result = stringifyId(response);
    return { result, error: null };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const getUserById = async (
  id: string | undefined | null
): SingleUserFetchPromiseWithStringId => {
  try {
    if (!users) await init();
    if (!id) throw "Didn't provide a valid id";

    const response = (await users.findOne({
      _id: new ObjectId(id)
    })) as UserDocumentWithObjectId;
    if (response === null) throw "Didn't find a user with the given id";

    const result = stringifyId(response);
    return { result, error: null };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const createNewUser = async (newUserInfo: {
  password: string;
  username: string;
  email: string;
  userClass: UserClass;
  firstName: string;
  lastName: string;
  fathersInitial: string;
}): SingleUserFetchPromiseWithStringId => {
  try {
    if (!users) await init();
    const {
      username,
      email,
      password,
      userClass,
      firstName,
      lastName,
      fathersInitial
    } = newUserInfo;
    const { salt, hash } = hashPassword(password);

    if ((await getUserByUsername(username)).result) throw "Username is taken!";
    if ((await getUserByEmail(username)).result)
      throw "This email is already being used!";

    const validFirstName = removeDuplicateSpaces(firstName);
    const validLastName = removeDuplicateSpaces(lastName);

    const newUserDocument: UserDocument = {
      profile: {
        userClass,
        firstName: removeDuplicateSpaces(firstName),
        lastName: removeDuplicateSpaces(lastName),
        fathersInitial: removeDuplicateSpaces(fathersInitial),
        username: generateUsername(validFirstName, validLastName),
        curriculumId: "" // TODO: Gotta handle this somehow too
      },
      account: {
        email,
        password: { salt, hash },
        subscriptionId: "" // TODO: Gotta handle this somehow too
      }
    };

    const result = await users.insertOne(newUserDocument);
    const newUser = {
      ...newUserDocument,
      _id: result.insertedId.toString()
    } as UserDocumentWithStringId;

    if (!result.acknowledged) throw "Failed to create new user";
    return { error: null, result: newUser };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const updateUser = async (
  id: string,
  updates: Partial<UserDocument>
): SingleUserFetchPromiseWithStringId => {
  try {
    if (!users) await init();
    await users.updateOne({ _id: new ObjectId(id) }, { $set: updates });

    // Fetch the updated user document
    const updatedUser = (await users.findOne({
      _id: new ObjectId(id)
    })) as UserDocumentWithObjectId;

    return {
      result: { ...updatedUser, _id: updatedUser._id.toString() },
      error: null
    };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};
