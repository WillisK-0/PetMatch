// test comment - rickelle
const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded());

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.listen(PORT, () => {
  console.log("Server is running...");
});
