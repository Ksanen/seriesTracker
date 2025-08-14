import settingsRoute from "./settings.mjs";
import seriesRoute from "./series.mjs";
import tagsRoute from "./tags.mjs";
import { Router } from "express";
const router = Router();
router.use("/api/series/settings", settingsRoute);
router.use("/api/series", seriesRoute);
router.use("/api/tags", tagsRoute);
export default router;
