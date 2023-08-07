import mongoose from "mongoose";

let isConnected = false; // variable to check if mongoose is connected

export const connectoDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGO_URI) {
    return console.log("MONGO_URI NOT FOUND");
  }

  if (isConnected) {
    console.log("Already connected to mongodb");
  }

  try {

    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("successfully connected to mongodb");

  } catch (error: any) {
    console.error(error.message);
  }
};
