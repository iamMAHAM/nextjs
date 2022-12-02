import { connect, disconnect, connections } from "mongoose";

type conn = {
  isConnected?: number;
};
const connection: conn = {};

const on = async (): Promise<void> => {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) throw new Error("env: MONGO_URL is required");
  if (connections.length > 0) {
    connection.isConnected = connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("use previous connection");
      return;
    }
    await disconnect();
  }
  const db = await connect(MONGO_URI);
  console.log("new connection");
  connection.isConnected = db.connections[0].readyState;
};

const off = async (): Promise<void> => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await disconnect();
      connection.isConnected = 0;
      return;
    }
    console.log("not disconnected i'm in test mode");
  }
};

const db = { on, off };
export default db;
