"use server";
import { ObjectId } from "mongodb";
export default async function newObjectId() {
  return new ObjectId();
}
