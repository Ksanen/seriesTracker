import mongoose from "mongoose";

const filterSettings = mongoose.Schema({
  type: String,
  genre: String,
  animation: String,
  watched: String,
  tags: [String],
  season: String,
  episode: String,
});
const SeriesFilterSettingsModel = mongoose.model(
  "seriesFilterSettings",
  filterSettings,
  "seriesFilterSettings"
);
export default SeriesFilterSettingsModel;
