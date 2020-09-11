import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createGraphSchema } from "./utils/configGraphQL";
const app = express();
createGraphSchema(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();
// import prototype host, port from file .env
const { HOST, PORT } = process.env;
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
