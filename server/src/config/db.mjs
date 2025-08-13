import mongoose from "mongoose";
const connectDb = async () => {
  try {
    const connection = await mongoose
      .connect(`${process.env.DB_URL}`)
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
