const SeriesFilterSettingsSchema = {
  season: {
    isInt: true,
    errorMessage: "season must be a int",
  },
  episode: {
    isInt: true,
    errorMessage: "episode must be a int",
  },
  type: {
    isString: true,
    errorMessage: "type must be a string",
  },
  genre: {
    isString: true,
    errorMessage: "genre must be a string",
  },
  watched: {
    isString: true,
    errorMessage: "watched must be a string",
  },
  tags: {
    isArray: true,
    errorMessage: "tags must be an array",
  },
  "tags.*": {
    isString: {
      errorMessage: "member of the tags array must be a string",
    },
  },
};
export default SeriesFilterSettingsSchema;
