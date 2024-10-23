import { Document, ObjectId } from "mongodb";

export type WithObjectId<T extends Document> = T & {
  _id: ObjectId;
};

export type SingleDocumentFetchPromise<T extends WithObjectId<Document>> =
  Promise<{
    result: T | null;
    error: string | null;
  }>;

export type MultipleDocumentFetchPromise<T extends WithObjectId<Document>> =
  Promise<{
    result: T[] | null;
    error: string | null;
  }>;
