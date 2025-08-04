const seriesSchema = {
  name: {
    isString: {
      errorMessage: "name must be a string",
    },
    notEmpty: {
      errorMessage: "name cannot be empty",
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
  season: {
    isInt: {
      options: {
        min: 0,
        errorMessage: "value  cannot be less than 0",
      },
      errorMessage: "The product price must be a Integer",
    },
  },
  episode: {
    isInt: {
      options: {
        min: 0,
        errorMessage: "value  cannot be less than 0",
      },
      errorMessage: "The product price must be a Integer",
    },
  },
  "watchTime.*": {
    isInt: {
      required: true,
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
