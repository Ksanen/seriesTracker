import express from "express";
import connectDb from "./src/config/db.mjs";
import cors from "cors";
import checkDataBaseConnection from "./src/middlewares/checkDataBaseConnection.mjs";
import tagModel from "./src/models/tag.mjs";
import routes from "./src/routes/index.mjs";
connectDb();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:4200", "http://192.168.0.53:4200"],
  })
);
app.use(routes);

const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server is listening on port ${PORT}`);
});
app.get("/api/tags", checkDataBaseConnection, async (req, res) => {
  try {
    const tags = await tagModel.find({}, { _id: 0 });
    res.status(200).json(tags);
  } catch (e) {
    console.log("error: ", e);
    res.status(500).json({ success: false, message: "internal server error" });
  }
});
