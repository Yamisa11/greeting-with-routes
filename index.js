import express from 'express'
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser'
import Greeting from './greeting.js';
import GreetingDBLogic from './db/db.js';
import DBJS from './database.js'
import flash from "express-flash";
import session from "express-session"

const app = express()
let database = GreetingDBLogic(DBJS)

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "Yamisa"

}));
app.use(flash())

var  greetingFunction = Greeting()
let errors
let nameCounts
let greetingMsg 

app.get('/', (req,res) => {
    let errorMsg = req.flash("error")[0]
    res.render('index', {
        showGreet : greetingFunction.getInputName(),
        theGreeting: errorMsg? "" : greetingMsg,
        errorMessage: errorMsg,
        counter : errorMsg? "" : nameCounts
    })
})

app.post('/greeting', (req,res) => {
    console.log(req.body.theInputName)
    console.log(req.body.languageInput);
//    greetingFunction.setInputName(req.body.theInputName)
(greetingFunction.theGreeting(req.body.theInputName,req.body.languageInput,database))
errors = greetingFunction.errors(req.body.theInputName, req.body.languageInput);
req.flash('error', errors);
greetingMsg = greetingFunction.getGreeting();
console.log(greetingMsg);
console.log(greetingFunction.errors(req.body.theInputName, req.body.languageInput));
nameCounts = greetingFunction.getNames().length
console.log(nameCounts);

   res.redirect('/')
})

let PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log('App started...', PORT);
})