const express = require("express");

var app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send({
    name: "Selçuk",
    likes: ["ss", "pp"]
  });
});

app.get("/about", (req, res) => {
  res.send("about page");
});

app.get("/bad", (req, res) => {
  res.send({ errorMessage: "unable to handle request" });
});

app.get("/test", (req, res) => {});

app.listen(3000, () => {
  console.log("Server is up, port 3000");
});
