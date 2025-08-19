import mongoose from "mongoose";
const checkDataBaseConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ success: false, msg: "database error" });
  }
  next();
};

export default checkDataBaseConnection;
