import { connect } from "mongoose";

const connectDB = (): Promise<void> => {
  const MONGO_URL = process.env.MONGO_URL;
  if (!MONGO_URL) throw new Error("env: MONGO_URL is required");
  return new Promise((next, reject) => {
    connect(MONGO_URL, (err) => {
      if (err) reject(err);
      console.log("Mongo is connected");
      next();
    });
  });
};

export default connectDB;
