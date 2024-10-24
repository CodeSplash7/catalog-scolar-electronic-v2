import { MongoClient, ServerApiVersion } from "mongodb";
const URI = process.env.MONGODB_URI;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!URI) throw new Error("Please add your mongo uri to env.local file");

// Cast the global object to include _mongoClientPromise
const globalWithMongoPromise = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to preserve the client across hot reloads
  if (!globalWithMongoPromise._mongoClientPromise) {
    client = new MongoClient(URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    });
    globalWithMongoPromise._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongoPromise._mongoClientPromise;
} else {
  // In production, just create the client and connect
  client = new MongoClient(URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  });
  clientPromise = client.connect();
}

export default clientPromise;
