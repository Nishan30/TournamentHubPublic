import mongoose, { Mongoose } from 'mongoose';

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}
const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
// Ensure the global object has the correct type
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

global.mongoose = global.mongoose || { conn: null, promise: null };

let cached: MongooseCache = global.mongoose;

async function dbConnect(): Promise<Mongoose> {

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    }).catch((error) => {
      cached.conn = null;
      cached.promise = null;
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
