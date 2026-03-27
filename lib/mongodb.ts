import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
   if (cached.conn) {
     return cached.conn;
   }
 
   const MONGODB_URI = process.env.MONGODB_URI;
 
   if (!MONGODB_URI) {
     console.warn("MONGODB_URI is not set in environment variables.");
     return; // Never throw during build
   }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
