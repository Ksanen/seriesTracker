import mongoose from "mongoose";
const connectDb = async () => {
  try {
    const connection = await mongoose
      .connect("mongodb://127.0.0.1:27017/seriesTrackerDev")
      .catch(() => {
        console.log("brak połączenia z bazą");
      });
    if (!connection) return;
    console.log("database connected");
  } catch (e) {
    console.log("error during connection with database: ");
  }
};
export default connectDb;
