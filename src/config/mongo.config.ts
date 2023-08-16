import mongoose, { ConnectOptions } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

async function connection() {
  try {
    const connectionOptions: ConnectOptions = {
      autoIndex: true,
      dbName: "chat",
    };

    await mongoose.connect(String(MONGO_URI), connectionOptions);

    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
}

export default connection;
