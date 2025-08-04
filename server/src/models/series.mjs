import mongoose from "mongoose";
const seriesSchema = mongoose.Schema({
  name: String,
  type: String,
  genre: String,
  season: Number,
  episode: Number,
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
