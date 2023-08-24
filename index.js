import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import Greeting from "./greeting.js";
import GreetingDBLogic from "./db/db.js";
import DBJS from "./database.js";
import flash from "express-flash";
import session from "express-session";

import indexRoute from "./routes/index.route.js"
import greetedRoute from "./routes/greeted.route.js";
import counterRoute from "./routes/counter.route.js"

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
let nameCounts =await database.getCounter()
let theIndexRoute = indexRoute(greetingFunction,database)
let theGreetedRoute = greetedRoute(database)
let theCounterRoute = counterRoute(database)


app.get("/", theIndexRoute.index );

app.post("/greeting", theIndexRoute.greeting);

app.get("/greeted", theGreetedRoute.greeted);

app.get("/counter/:username", theCounterRoute.counterHistory);

app.post("/reset", theIndexRoute.reset);

let PORT = process.env.PORT || 2023;
app.listen(PORT, () => {
  console.log("App started...", PORT);
});
