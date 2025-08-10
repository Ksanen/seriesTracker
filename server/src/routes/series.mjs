import { Router } from "express";
import SeriesModel from "../models/series.mjs";
import seriesSchema from "../utils/seriesSchema.mjs";
import { checkSchema, validationResult } from "express-validator";
import nameExists from "../utils/nameExists.mjs";
import checkDataBaseConnection from "../middlewares/checkDataBaseConnection.mjs";
const router = Router();
router.get("/", checkDataBaseConnection, async (req, res) => {
  const series = await SeriesModel.find({}, { __v: 0 });
  res.json(series);
});
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await SeriesModel.deleteOne({ _id: id });
    res.status(200).json({ success: true, msg: "series has been removed" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, msg: "internal server error" });
  }
});

router.post("/", checkSchema(seriesSchema), async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({
        success: false,
        msg: "validation error",
      });
    }
    if (await nameExists(req.body.names[0])) {
      return res.status(409).send({
        success: false,
        msg: "this name already exists",
      });
    }
    const lastSeries = await SeriesModel.create(req.body);
    return res.status(200).send({
      success: true,
      series: lastSeries,
      msg: "successful addition of the series",
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, msg: "internal server error" });
  }
});
router.patch("/:id", checkSchema(seriesSchema), async (req, res) => {
  try {
    const result = validationResult(req);
    const name = req.body.names[0];
    const id = req.params.id;
    if (!result.isEmpty()) {
      console.log(result.array());
      return res.status(400).send({
        success: false,
        msg: "validation error",
      });
    }
    /*
      Sprawdza czy w bazie nie ma serii o takiej nazwie. Upewnia się też, że nie będzie
      błędu gdy użytkownik nie zmieni nazwy, bo w bazie zawsze byłaby seria o tej nazwie, jednakże wtedy
      to nie jest błąd
    */
    const originalSeries = await SeriesModel.findById(id);
    if (!originalSeries) {
      return res.status(404).send({
        success: false,
        msg: "Series not found",
      });
    }
    const nameOfSeries = originalSeries.names[0];
    if (name !== nameOfSeries && (await nameExists(name))) {
      return res.status(409).send({
        success: false,
        msg: "this name already exists",
      });
    }
    const series = req.body;
    const updateResult = await SeriesModel.updateOne(
      {
        _id: id,
      },
      {
        names: series.names,
        type: series.type,
        genre: series.genre,
        season: series.season,
        episode: series.episode,
        watchTimeActive: series.watchTimeActive,
        watchTime: {
          hours: series.watchTime.hours,
          minutes: series.watchTime.minutes,
          seconds: series.watchTime.seconds,
        },
        watched: series.watched,
        tagNames: series.tagNames,
      }
    );
    if (updateResult.matchedCount === 0) {
      return res.status(404).send({
        success: false,
        msg: "series not found",
      });
    }
    return res.status(200).send({
      success: true,
      msg: "successful update",
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, msg: "internal server error" });
  }
});

export default router;
