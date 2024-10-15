import { Document, ObjectId } from "mongodb";

export type WithStringId<T extends Document> = T & {
  _id: string;
};

export type WithObjectId<T extends Document> = T & {
  _id: ObjectId;
};

export type SingleDocumentFetchPromise<
  T extends WithStringId<Document> | WithObjectId<Document>
> = Promise<{
  result: T | null;
  error: string | null;
}>;

export type MultipleDocumentFetchPromise<
  T extends WithStringId<Document> | WithObjectId<Document>
> = Promise<{
  result: T[] | null;
  error: string | null;
}>;
