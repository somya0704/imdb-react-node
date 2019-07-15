const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const actorRoute = require('./src/routes/actor');
const movieRoute = require('./src/routes/movie');


mongoose.connect('mongodb://test:test123@ds341837.mlab.com:41837/learning');

const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json());
app.use(express.static('uploads'));

app.use('/actors', actorRoute);
app.use('/movies', movieRoute);
app.use('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Welcome from express',
  });
});


module.exports = app;
