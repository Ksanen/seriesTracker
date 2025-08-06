import mongoose from "mongoose";

const viewSettings = mongoose.Schema({
  name: Boolean,
  season: Boolean,
  episode: Boolean,
  watched: Boolean,
  watchtime: Boolean,
  type: Boolean,
  genre: Boolean,
  tags: Boolean,
});
const SeriesViewSettingsModel = mongoose.model(
  "seriesViewSettings",
  viewSettings,
  "seriesViewSettings"
);
export default SeriesViewSettingsModel;
