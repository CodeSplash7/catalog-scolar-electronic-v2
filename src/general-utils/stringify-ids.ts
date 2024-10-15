import { WithObjectId, WithStringId } from "@/types/fetching-types";
import { Document } from "mongodb";

export const stringifyId = <T extends Document>(b: WithObjectId<T>) => {
  return { ...b, _id: b._id.toString() } as WithStringId<T>;
};

export const stringifyIds = <T extends Document>(blogs: WithObjectId<T>[]) => {
  return blogs.map(stringifyId) as WithStringId<T>[];
};
