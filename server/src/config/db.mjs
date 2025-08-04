import mongoose from "mongoose";
const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/seriesTracker");
    console.log("database connected");
  } catch (e) {
    console.log("error: ", e);
  }
};
export default connectDb;
