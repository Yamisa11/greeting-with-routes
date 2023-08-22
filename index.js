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
        showGreet : greetingFunction.getName(),
        theGreeting: errorMsg? "" : greetingMsg,
        errorMessage: errorMsg,
        counter : errorMsg? "" : nameCounts
    })
})

app.post('/greeting', async (req,res) => {

(greetingFunction.theGreeting(req.body.theInputName,req.body.languageInput,database))
errors = greetingFunction.errors(req.body.theInputName, req.body.languageInput);
req.flash('error', errors);
greetingMsg = greetingFunction.getGreeting();

nameCounts = (await database.getAll()).length

console.log(nameCounts);

   res.redirect('/')
})

app.get('/greeted', async function(req,res) {
    res.render('greeted', {
        listOfNames: await database.getAll()
        
    })
  
})

app.get('/counter/:username', async function(req,res) {
    let username = req.params.username
    let theCount = (await database.getUserCounter(username))[0]
console.log(theCount);
    res.render('counter', {
        user: username,
        count:  theCount.counter
    })
})

app.post('/reset', async function (req,res) {
    try {
        database.reset(database);
        req.flash('resetMessage', 'You have cleared your database!')
        res.redirect('/')
    }
    catch (error) {
        console.log('Error reseting your webapp', error)
    }

})


let PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log('App started...', PORT);
})