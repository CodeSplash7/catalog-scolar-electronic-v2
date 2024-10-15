import { MongoClient, ServerApiVersion } from "mongodb";
const URI = process.env.MONGO_URI;

if (!URI) throw new Error("Please add your mongo uri to env.local file");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

let clientPromise: Promise<MongoClient>;

clientPromise = client.connect(); // Store the connection
export default clientPromise;
