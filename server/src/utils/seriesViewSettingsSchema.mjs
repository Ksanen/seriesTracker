const SeriesViewSettingsSchema = {
  name: {
    isBoolean: true,
    errorMessage: "name must be  a boolean",
  },
  season: {
    isBoolean: true,
    errorMessage: "season must be  a boolean",
  },
  episode: {
    isBoolean: true,
    errorMessage: "episode must be  a boolean",
  },
  watched: {
    isBoolean: true,
    errorMessage: "watched must be  a boolean",
  },
  watchtime: {
    isBoolean: true,
    errorMessage: "watchtime must be  a boolean",
  },
  type: {
    isBoolean: true,
    errorMessage: "type must be  a boolean",
  },
  genre: {
    isBoolean: true,
    errorMessage: "genre must be  a boolean",
  },
  tags: {
    isBoolean: true,
    errorMessage: "tags must be  a boolean",
  },
};

export default SeriesViewSettingsSchema;
