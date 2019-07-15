let express = require('express')
let app = express()
var mongoose = require('mongoose')
var cors = require('cors')

const actorRoute = require("./src/routes/actor")
const movieRoute = require("./src/routes/movie")

const server = 'ds341837.mlab.com:41837'
const database = 'learning'
const user = 'nitinkumar24'
const password = 'omg123omg123'


mongoose.connect("mongodb://test:test123@ds341837.mlab.com:41837/learning");

const port = 3000


let path = require('path')

let bodyParser = require('body-parser')

var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors());

app.use(bodyParser.json())
app.use(express.static('uploads'))

app.use('/actors', actorRoute);
app.use('/movies', movieRoute);
app.use('/', (req,res)=>{
    res.json({
        status: 'ok',
        message: 'Welcome from express',
    });
});



 module.exports = app;
