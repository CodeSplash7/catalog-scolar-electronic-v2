"use server";
import { ObjectId } from "mongodb";

export default async function newStringId() {
  return new ObjectId().toString();
}
