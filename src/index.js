import express from "express";
import routes from "./routes.js";

const app = express();
const json = express.json();

const BASE_URL = "http://localhost";
const PORT = 3000;

app.use(json);
app.use(routes);

app.listen(PORT, () => {
  console.log(`Vulnerable Lab running on ${BASE_URL}:${PORT}`);
});
