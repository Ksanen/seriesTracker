import express from "express";
import connectDb from "./src/config/db.mjs";
import cors from "cors";
import routes from "./src/routes/index.mjs";
import dotenv from "dotenv";
dotenv.config();
connectDb();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:4200", "http://192.168.0.53:4200"],
  })
);
app.use(routes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`server is listening on port ${PORT}`);
});
