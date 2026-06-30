import mongoose from "mongoose";
import environment from "./environment";

declare global {
  var mongooseConnection:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cached = global.mongooseConnection ?? {
  conn: null,
  promise: null,
};

global.mongooseConnection = cached;

export async function connectToDB() {
  try {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(environment.MONGODB_URI);
    }

    cached.conn = await cached.promise;

    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}
