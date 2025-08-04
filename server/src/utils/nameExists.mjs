import SeriesModel from "../models/series.mjs";
const nameExists = async (nameToCheck) => {
  const obiekt = await SeriesModel.find({}, { name: 1 });
  const names = obiekt.map((obiekt) => obiekt.name);
  const nameExist = names.some((name) => name.toLowerCase() === nameToCheck);
  return nameExist ? true : false;
};
export default nameExists;
