import express from "express";
import connectDb from "./src/config/db.mjs";
import SeriesModel from "./src/models/series.mjs";
import cors from "cors";
import nameExists from "./src/utils/nameExists.mjs";
import { checkSchema, validationResult } from "express-validator";
import seriesSchema from "./src/utils/seriesSchema.mjs";
connectDb();
const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
const PORT = 3000;
app.use(express.json());
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
app.get("/api/series", async (req, res) => {
  const series = await SeriesModel.find({}, { __v: 0 });
  res.json(series);
});
app.delete("/api/series/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await SeriesModel.deleteOne({ _id: id });
    res.status(200).json({ success: true, msg: "series has been removed" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, msg: "internal server error" });
  }
});

app.post("/api/series", checkSchema(seriesSchema), async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({
        success: false,
        msg: "validation error",
      });
    }
    if (await nameExists(req.body.name)) {
      return res.status(409).send({
        success: false,
        msg: "this name already exists",
      });
    }
    await SeriesModel.create(req.body);
    return res.status(200).send({
      success: true,
      msg: "successful addition of the series",
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, msg: "internal server error" });
  }
});
app.patch("/api/series/:id", checkSchema(seriesSchema), async (req, res) => {
  try {
    const result = validationResult(req);
    const name = req.body.name;
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
    const nameOfSeries = originalSeries.name;
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
        name: series.name,
        type: series.type,
        genre: series.genre,
        season: series.season,
        episode: series.episode,
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
