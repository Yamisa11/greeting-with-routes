import express from 'express'
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser'
import Greeting from './greeting.js';
import GreetingDBLogic from './db/db.js';
import DBJS from './database.js'

const app = express()
let database = GreetingDBLogic(DBJS)

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
var  greetingFunction = Greeting()
let error
let nameCounts
let greetingMsg 

app.get('/', (req,res) => {
    
    res.render('index', {
        showGreet : greetingFunction.getInputName(),
        theGreeting: error? "" : greetingMsg,
        errorMessage: error,
        counter : nameCounts
    })
})

app.post('/greeting', (req,res) => {
    console.log(req.body.theInputName)
    console.log(req.body.languageInput);
//    greetingFunction.setInputName(req.body.theInputName)
(greetingFunction.theGreeting(req.body.theInputName,req.body.languageInput,database))
error = greetingFunction.errors(req.body.theInputName, req.body.languageInput);
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