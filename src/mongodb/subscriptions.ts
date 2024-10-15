"use server";
import {
  SubscriptionDocument,
  SubscriptionStatus,
  SubscriptionType
} from "@/types/subscription-types";
import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from "@/mongodb/index";
import {
  SingleDocumentFetchPromise,
  WithObjectId,
  WithStringId
} from "@/types/fetching-types";
import { stringifyId } from "@/general-utils/stringify-ids";
import { handleBasicFetchError } from "@/general-utils/handleBasicFetchError";

// Document with different ids type
type SubscriptionDocumentWithObjectId = WithObjectId<SubscriptionDocument>;
type SubscriptionDocumentWithStringId = WithStringId<SubscriptionDocument>;

type SingleSubscriptionFetchPromise<
  T extends SubscriptionDocumentWithObjectId | SubscriptionDocumentWithStringId
> = SingleDocumentFetchPromise<T>;

// Readablity alias types
export type SingleSubscriptionFetchPromiseWithStringId =
  SingleSubscriptionFetchPromise<SubscriptionDocumentWithStringId>;

let client: MongoClient,
  db: Db,
  subscriptions: Collection<SubscriptionDocument>;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db(); // Log the database name
    subscriptions = db.collection("subscriptions");
  } catch (err) {
    throw new Error("Failed to establish the database connection");
  }
}
(async () => await init())();

export const getSubscriptionById = async (
  id: string | undefined | null
): SingleSubscriptionFetchPromiseWithStringId => {
  try {
    if (!subscriptions) await init();
    if (!id) throw "Didn't provide a valid id";

    const response = (await subscriptions.findOne({
      _id: new ObjectId(id)
    })) as SubscriptionDocumentWithObjectId;
    if (response === null) throw "Didn't find a subscription with the given id";

    const result = stringifyId(response);
    return { result, error: null };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const createNewSubscription = async (
  status: SubscriptionStatus,
  type: SubscriptionType
): SingleSubscriptionFetchPromiseWithStringId => {
  try {
    if (!subscriptions) await init();

    const freeTrialDuration = 14; // in days
    const today = new Date();
    const nextPaymentDate = new Date();
    nextPaymentDate.setDate(today.getDate() + freeTrialDuration);

    const newSubscriptionDocument: SubscriptionDocument = {
      status,
      type,
      startDate: null,
      endDate: null,
      nextPaymentDate: nextPaymentDate.toString(),
      freeTrial: true,
      trialDuration: 14,
      paymentHistory: []
    };

    const result = await subscriptions.insertOne(newSubscriptionDocument);
    const newSubscription = {
      ...newSubscriptionDocument,
      _id: result.insertedId.toString()
    } as SubscriptionDocumentWithStringId;

    if (!result.acknowledged) throw "Failed to create new user";
    return { error: null, result: newSubscription };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};

export const updateSubscription = async (
  id: string,
  updates: Partial<SubscriptionDocument>
): SingleSubscriptionFetchPromiseWithStringId => {
  try {
    if (!subscriptions) await init();
    await subscriptions.updateOne({ _id: new ObjectId(id) }, { $set: updates });

    // Fetch the updated user document
    const updatedSubscription = (await subscriptions.findOne({
      _id: new ObjectId(id)
    })) as SubscriptionDocumentWithObjectId;

    return {
      result: {
        ...updatedSubscription,
        _id: updatedSubscription._id.toString()
      },
      error: null
    };
  } catch (err) {
    return handleBasicFetchError(err);
  }
};
