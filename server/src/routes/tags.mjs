import { body, validationResult } from "express-validator";
import tagModel from "../models/tag.mjs";
import SeriesModel from "../models/series.mjs";
import { Router } from "express";
const router = Router();
router.post("/", body("tagName").isString().notEmpty(), async (req, res) => {
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
router.delete("/:name", async (req, res) => {
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
