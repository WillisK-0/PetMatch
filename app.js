// test comment - rickelle
const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");

const session = require("express-session");

// session middleWare
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// const PORT = process.env.PORT || 8080;
const logInRouter = require("./routes/login");
const homeRouter = require("./routes/home");
const path = require("path");
const VIEWS_PATH = path.join(__dirname, "/views");
app.use(express.urlencoded());

app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"));
app.set("views", VIEWS_PATH);
app.set("view engine", "mustache");

app.use("/log-in", logInRouter);
app.use("/home", homeRouter);

app.listen(3000, () => {
  console.log("Server is running...");
});
