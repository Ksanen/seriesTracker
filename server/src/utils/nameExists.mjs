import SeriesModel from "../models/series.mjs";
const nameExists = async (nameToCheck) => {
  const obiekt = await SeriesModel.find({}, { names: 1 });
  const names = obiekt.map((obiekt) => [...obiekt.names]);
  const nameExist = names.some((name) => name.toLowerCase() === nameToCheck);
  return nameExist ? true : false;
};
export default nameExists;
