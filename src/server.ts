import "dotenv/config";
import express from "express";
import routes from "./routes";

import mongoConnection from "../src/config/mongo.config";

(async () => await mongoConnection())();

const app = express();

app.listen(3333, () => console.log("Server is up running on port 3333 🟢"));

app.use(express.json());

app.use(routes);
