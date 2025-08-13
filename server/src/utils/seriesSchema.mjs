const seriesSchema = {
  names: {
    isArray: {
      errorMessage: "names must be an array",
    },
  },
  type: {
    isString: true,
    errorMessage: "type must be a string",
  },
  genre: {
    isString: true,
    errorMessage: "genre must be a string",
  },
  animation: {
    isString: true,
    errorMessage: "animation must be a string",
  },
  season: {
    optional: {
      options: { nullable: true },
    },
    isInt: {
      options: {
        min: 0,
        errorMessage: "value  cannot be less than 0",
      },
      errorMessage: "season must be a Integer",
    },
  },
  episode: {
    optional: {
      options: { nullable: true },
    },
    isInt: {
      options: {
        min: 0,
        errorMessage: "value  cannot be less than 0",
      },
      errorMessage: "episode must be an Integer",
    },
  },
  watchTimeActive: {
    isBoolean: true,
    errorMessage: "watchTimeActive must be a boolean",
  },
  "watchTime.*": {
    isInt: {
      options: {
        min: 0,
        errorMessage: "value  cannot be less than 0",
      },
    },
    errorMessage: "field of watchTime must be an integer",
  },
  watched: {
    isBoolean: true,
    errorMessage: "watched field must be a boolean",
  },
  tagNames: {
    isArray: true,
    errorMessage: "tagNames field must be an array",
  },
  "tagNames.*": {
    isString: {
      errorMessage: "member of the tagNames array must be a string",
    },
  },
};
export default seriesSchema;
