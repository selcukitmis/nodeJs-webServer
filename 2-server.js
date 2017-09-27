const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
var app = express();

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

// gelen requestleri loglamak için
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `Time: ${now}, Request Method: ${req.method}, Request Url: ${req.url} \n`;
  fs.appendFile("server.log", log, err => {
    if (err) console.log("Can not write to server.log");
  });
  next();
});

// Site bakım aşamasında olursa tüm yönlendirmeleri tek yere yapmak için kullanılır.

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
//   next();
// });

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to my website",
    currentYear: new Date().getFullYear()
  });
});

app.get("/api", (req, res) => {
  res.send({
    name: "İlkay",
    surname: "Öztürk"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "Page Title From Node Server",
    currentYear: new Date().getFullYear()
  });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Page Title From Node Server",
    currentYear: new Date().getFullYear()
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is up, port 3000");
});
