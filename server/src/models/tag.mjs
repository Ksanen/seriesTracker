import mongoose from "mongoose";
const tagSchema = mongoose.Schema({
  name: String,
  numberOfSeriesAttached: Number,
});
const tagModel = mongoose.model("tag", tagSchema, "tags");
export default tagModel;
