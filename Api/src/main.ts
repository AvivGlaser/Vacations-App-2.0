import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
import { initDB } from "./DB/db";
import routes from './Routes/routes.index';

initDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/healthcheck", async (req, res) => {
  return res.send(`API is working...`);
});

app.use(routes);

app.use((error, req, res, next) => {
  console.log(error?.message);
  if (error.status) {
    return res.status(500).json({ message: "Something went wrong.." });
  }
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Listening to Port: ${PORT}`);
});
