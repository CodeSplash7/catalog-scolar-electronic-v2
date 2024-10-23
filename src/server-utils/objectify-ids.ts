// "use server";
// import { ObjectId, Document } from "mongodb";
// import { WithObjectId, WithStringId } from "@/types/fetching-types";

// export const objectifyId = async <T extends Document>(
//   b: WithStringId<T>
// ): Promise<WithObjectId<T>> => {
//   return { ...b, _id: new ObjectId(b._id) } as WithObjectId<T>;
// };

// export const objectifyIds = async <T extends Document>(
//   items: WithStringId<T>[]
// ): Promise<WithObjectId<T>[]> => {
//   return Promise.all(items.map(objectifyId));
// };
