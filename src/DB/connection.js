import mongoose from "mongoose";

const connectDB = async () => {
  // console.log(process.env.MONGO_URL);

  await mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => console.log("MongoDB connected"))
    .catch((error) => {
      console.log("MongoDB connection error:", { error });
    });
};

export default connectDB;
