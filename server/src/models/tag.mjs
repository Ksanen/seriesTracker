import mongoose from "mongoose";
const tagSchema = mongoose.Schema({
  name: String,
  seriesAttached: [String],
});
const tagModel = mongoose.model("tag", tagSchema, "tags");
export default tagModel;
