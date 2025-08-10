import mongoose from "mongoose";
const seriesSchema = mongoose.Schema({
  names: [String],
  type: String,
  genre: String,
  season: Number,
  episode: Number,
  watchTimeActive: Boolean,
  watchTime: {
    hours: Number,
    minutes: Number,
    seconds: Number,
  },
  watched: Boolean,
  tagNames: [String],
});
const SeriesModel = mongoose.model("series", seriesSchema, "series");
export default SeriesModel;
