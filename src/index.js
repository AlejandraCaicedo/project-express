const express = requiere("express");
const app = express();

const middlewareNotFound = require("./middlewares/notFound");
const middlewareError = require("./middlewares/error");
const middlewareLog = require("./middlewares/log");

const morgan = require("morgan");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(middlewareLog);

app.get("/", (req, res) => {
  res.status(201).send({ name: "Aleja", role: "dev" });
});

app.get("/:cedula", log, (req, res) => {
  const { cedula } = req.params;
  res.status(201).send(cedula);
});

app.post("/", (req, res) => {
  const body = req.body;
  console.log(body);
  res.json(body);
});

app.post("/error", (req, res) => {
  throw new Error("Endpoint error");
});

app.use(middlewareNotFound);
app.use(middlewareError);

app.listen(3500, () => {
  console.log("server is running");
});
