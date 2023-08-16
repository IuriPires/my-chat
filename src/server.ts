import express from "express";
import routes from "./routes";

const app = express();

app.listen(3333, () => console.log("Server is up running on port 3333 🟢"));

app.use(express.json());

app.use(routes);
