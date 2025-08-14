import { Router } from "express";
import SeriesViewSettingsModel from "../models/viewSettings.mjs";
import SeriesViewSettingsSchema from "../utils/seriesViewSettingsSchema.mjs";
import checkDataBaseConnection from "../middlewares/checkDataBaseConnection.mjs";
import defaultViewSettings from "../utils/viewSettings.mjs";
import { checkSchema } from "express-validator";
const router = Router();
router.get("/view", checkDataBaseConnection, async (req, res) => {
  try {
    await SeriesViewSettingsModel.findOneAndUpdate(
      {},
      { $setOnInsert: defaultViewSettings },
      { upsert: true, new: true }
    );
    const settings = await SeriesViewSettingsModel.findOne(
      {},
      { _id: 0, __v: 0 }
    );
    return res.status(200).json(settings);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "internal server error" });
  }
});
router.post(
  "/view",
  checkSchema(SeriesViewSettingsSchema),
  async (req, res) => {
    try {
      const newSettings = req.body;
      await SeriesViewSettingsModel.updateOne({}, newSettings);
      return res.status(200).json({ success: true, msg: "successful update" });
    } catch (e) {
      console.log("error: ", e);
      return res.status(500).json({ message: "internal server error" });
    }
  }
);
export default router;
