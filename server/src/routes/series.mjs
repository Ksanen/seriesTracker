import { Router } from "express";
import SeriesModel from "../models/series.mjs";
import seriesSchema from "../utils/seriesSchema.mjs";
import { body, checkSchema, validationResult } from "express-validator";
import nameExists from "../utils/nameExists.mjs";
import checkDataBaseConnection from "../middlewares/checkDataBaseConnection.mjs";
import tagModel from "../models/tag.mjs";
const router = Router();
router.get("/", checkDataBaseConnection, async (req, res) => {
  const series = await SeriesModel.find({}, { __v: 0 });
  res.json(series);
});
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const series = await SeriesModel.findById(id);
    if (!series) {
      return res
        .json(404)
        .json({ success: false, message: "series not found" });
    }
    await SeriesModel.deleteOne({ _id: id });
    res.status(200).json({ success: true, msg: "series has been removed" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, msg: "internal server error" });
  }
});
async function removeTagsConnections(id, tagNames) {
  try {
    for (let i = 0; i < tagNames.length; i++) {
      /* szuka tagu i z .seriesAttached usuwa id serii */
      const tag = await tagModel.findOne({ name: tagNames[i] });
      if (!tag) {
        return;
      }
      const seriesAttachedSet = new Set(tag.seriesAttached);
      seriesAttachedSet.delete(id);
      tag.seriesAttached = [...seriesAttachedSet];
      await tag.save();
    }
  } catch (e) {
    console.log(e);
  }
}
async function addTagsConnections(id, tagNames) {
  try {
    id = id.toString();
    for (let i = 0; i < tagNames.length; i++) {
      let tag = await tagModel.findOne({ name: tagNames[i] });
      if (!tag) {
        continue;
      }
      tag.seriesAttached.push(id);
      tag.seriesAttached = [...new Set(tag.seriesAttached)];
      /* zamiana na set zapobiega 
      dodaniu ponownie tego samego id do tablicy */
      await tag.save();
    }
  } catch (e) {
    console.log(e);
  }
}
async function updateConnections(id, newTagNames, oldTagNames) {
  /* usuwa poprzednie powiązania i tworzy nowe, dzięki czemu
      nie trzeba sprawdzać, które tagi usunąć,a które zostawić.
    */
  await removeTagsConnections(id, oldTagNames);
  await addTagsConnections(id, newTagNames);
}
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
    await addTagsConnections(lastSeries.id, lastSeries.tagNames);
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
    await updateConnections(id, series.tagNames, originalSeries.tagNames);
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
router.post("/tags", body("tagName").isString(), async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({
        success: false,
        msg: "validation error",
      });
    }
    const tagExists = await tagModel.exists({
      name: req.body.tagName,
    });
    if (tagExists) {
      return res.status(409).send({
        success: false,
        msg: "Tag exists",
      });
    }
    await tagModel.create({
      name: req.body.tagName,
      seriesAttached: [],
    });
    return res.status(200).send({
      success: true,
      msg: "successful creation of tag",
    });
  } catch (e) {
    res.status(500).json({ success: false, msg: "internal server error" });
  }
});
router.delete("/tags/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const tag = await tagModel.findOne({ name: name });
    if (!tag) {
      return res.status(404).json({
        success: false,
        msg: "tag not found",
      });
    }
    const updatedSeries = [];
    const idOfSeriesAttached = tag.seriesAttached;
    /* usuwa tag ze wszystkich serii */
    for (let i = 0; i < idOfSeriesAttached.length; i++) {
      const series = await SeriesModel.findById(idOfSeriesAttached[i]);
      if (!series) {
        continue;
      }
      const tagNames = new Set(series.tagNames);
      tagNames.delete(name);
      series.tagNames = [...tagNames];
      const updated = await series.save();
      updatedSeries.push(updated);
    }
    await tagModel.deleteOne({ name: name });
    return res.status(200).json(updatedSeries);
  } catch (e) {
    res.status(500).json({ success: false, msg: "internal server error" });
  }
});
export default router;
