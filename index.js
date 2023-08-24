import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import Greeting from "./greeting.js";
import GreetingDBLogic from "./db/db.js";
import DBJS from "./database.js";
import flash from "express-flash";
import session from "express-session";

const app = express();
let database = GreetingDBLogic(DBJS);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "Yamisa",
  })
);
app.use(flash());

var greetingFunction = Greeting();
let errors;
let greetingMsg;
let nameCounts =await database.getCounter()
let resets;

app.get("/", (req, res) => {
  let errorMsg = req.flash("error")[0];
  let resetMsg = req.flash("resetMsg");
  res.render("index", {
    showGreet: greetingFunction.getName(),
    theGreeting: errorMsg || resets ? "" : greetingMsg,
    errorMessage: errorMsg,
    counter: nameCounts,
    resetMessage: resetMsg,
  });
});

app.post("/greeting", async (req, res) => {
  await greetingFunction.theGreeting(
    req.body.theInputName,
    req.body.languageInput,
    database
  );
  errors = greetingFunction.errors(
    req.body.theInputName,
    req.body.languageInput
  );
  req.flash("error", errors);
  greetingMsg =  greetingFunction.getGreeting();

 nameCounts = await database.getCounter();

  

  res.redirect("/");
});

app.get("/greeted", async function (req, res) {
  res.render("greeted", {
    listOfNames: await database.getAll(),
  });
});

app.get("/counter/:username", async function (req, res) {
  let username = req.params.username;
  let theCount = (await database.getUserCounter(username))[0];
  console.log(theCount);
  res.render("counter", {
    user: username,
    count: theCount.counter,
  });
});

app.post("/reset", async function (req, res) {
  resets = await database.reset(database);
  req.flash("resetMsg", "Successfully cleared database!");
  greetingMsg = "";
  nameCounts = 0;
  res.redirect("/");
});

let PORT = process.env.PORT || 2023;
app.listen(PORT, () => {
  console.log("App started...", PORT);
});
