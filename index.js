import express from 'express'
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser'
import Greeting from './greeting.js';

const app = express()

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
var  greetingFunction = Greeting()
let error

app.get('/', (req,res) => {
    
    res.render('index', {
        showGreet : greetingFunction.getInputName(),
        theGreeting: greetingFunction.getGreeting(),
        errorMessage: error
    })
})

app.post('/greeting', (req,res) => {
    console.log(req.body.theInputName)
    console.log(req.body.languageInput);
//    greetingFunction.setInputName(req.body.theInputName)
(greetingFunction.theGreeting(req.body.theInputName,req.body.languageInput))
error = greetingFunction.errors(req.body.theInputName, req.body.languageInput);
console.log(greetingFunction.getGreeting());
console.log(greetingFunction.errors(req.body.theInputName, req.body.languageInput));

   res.redirect('/')
})

let PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log('App started...', PORT);
})