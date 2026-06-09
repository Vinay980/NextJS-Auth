import type { Mongoose } from "mongoose";
import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  } | undefined;
}

const cached = global.mongoose ?? (global.mongoose = { conn: null, promise: null });

export default async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose
            .connect(process.env.MONGO_URL!, opts)
            .then((mongoose) => {
                console.log("Connected to database");
                return mongoose;
            })
            .catch((err) => {
                console.log("Database connection error: ", err);
                throw err;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

