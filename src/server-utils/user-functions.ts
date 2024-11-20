"use server";

import createUsername from "@/general-utils/createUsername";
import { handleBasicFetchError } from "@/general-utils/handleBasicFetchError";
import { getUserById, updateUser } from "@/mongodb/users";
import { UserClassGradeLevel, UserClassSection } from "@/types/user-types";

export async function updateUserLastName(userId: string, newLastName: string) {
  try {
    const { result: user, error: userError } = await getUserById(userId);
    if (userError || !user) throw "Failed to find the user: " + userError;

    const newUsername = createUsername(newLastName, user.profile.firstName);

    const { result: updateResult, error: updateError } = await updateUser(
      userId,
      {
        ...user,
        profile: {
          ...user.profile,
          lastName: newLastName,
          username: newUsername
        }
      }
    );
    if (updateError || !updateResult)
      throw "Failed to update the user: " + updateError;

    return { result: updateResult, error: null };
  } catch (err) {
    handleBasicFetchError(err);
  }
}

export async function updateUserFirstName(
  userId: string,
  newFirstName: string
) {
  try {
    const { result: user, error: userError } = await getUserById(userId);
    if (userError || !user) throw "Failed to find the user: " + userError;

    const newUsername = createUsername(user.profile.lastName, newFirstName);

    const { result: updateResult, error: updateError } = await updateUser(
      userId,
      {
        ...user,
        profile: {
          ...user.profile,
          firstName: newFirstName,
          username: newUsername
        }
      }
    );
    if (updateError || !updateResult)
      throw "Failed to update the user: " + updateError;

    return { result: updateResult, error: null };
  } catch (err) {
    handleBasicFetchError(err);
  }
}

export async function updateUserFatherInitial(
  userId: string,
  newInitial: string
) {
  try {
    const { result: user, error: userError } = await getUserById(userId);
    if (userError || !user) throw "Failed to find the user: " + userError;

    const { result: updateResult, error: updateError } = await updateUser(
      userId,
      {
        ...user,
        profile: { ...user.profile, fathersInitial: newInitial }
      }
    );
    if (updateError || !updateResult)
      throw "Failed to update the user: " + updateError;

    return { result: updateResult, error: null };
  } catch (err) {
    handleBasicFetchError(err);
  }
}

export async function updateUserGradeLevel(
  userId: string,
  newGradeLevel: UserClassGradeLevel
) {
  try {
    const { result: user, error: userError } = await getUserById(userId);
    if (userError || !user) throw "Failed to find the user: " + userError;

    const { result: updateResult, error: updateError } = await updateUser(
      userId,
      {
        ...user,
        profile: {
          ...user.profile,
          userClass: { ...user.profile.userClass, gradeLevel: newGradeLevel }
        }
      }
    );
    if (updateError || !updateResult)
      throw "Failed to update the user: " + updateError;

    return { result: updateResult, error: null };
  } catch (err) {
    handleBasicFetchError(err);
  }
}

export async function updateUserSection(
  userId: string,
  newSection: UserClassSection
) {
  try {
    const { result: user, error: userError } = await getUserById(userId);
    if (userError || !user) throw "Failed to find the user: " + userError;

    const { result: updateResult, error: updateError } = await updateUser(
      userId,
      {
        ...user,
        profile: {
          ...user.profile,
          userClass: { ...user.profile.userClass, section: newSection }
        }
      }
    );
    if (updateError || !updateResult)
      throw "Failed to update the user: " + updateError;

    return { result: updateResult, error: null };
  } catch (err) {
    handleBasicFetchError(err);
  }
}
