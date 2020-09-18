import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { SubjectRouter } from "./router/subject-router/index.r";
import { createConnection } from "typeorm";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();
// import prototype host, port from file .env
const { HOST, PORT } = process.env;
// connect database
(async function () {
  try {
    await createConnection();
    console.log("connect postgres success");
  } catch (error) {
    console.log("connect postgres error");
    console.log(error.message);
  }
})();
app.use("/API", SubjectRouter);
app.get("*", (req: Request, res: Response) => {
  res.json({ error: "Not found" });
});
app.post("*", (req: Request, res: Response) => {
  res.json({ error: "Not found" });
});
app.put("*", (req: Request, res: Response) => {
  res.json({ error: "Not found" });
});
app.delete("*", (req: Request, res: Response) => {
  res.json({ error: "Not found" });
});
app.listen(PORT, () => {
  console.log(`Start ${HOST}:${PORT} success`);
});
