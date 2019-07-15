//let movieModel = require("../models/movieModel")
let movieController = require("../controllers/movieController")
let express = require('express')
let router = express.Router()
import { upload } from '../config/posterMulter';

router.get('/', movieController.getMovies)

router.post('/', upload.single('poster'), movieController.newMovie)

router.put('/:id', upload.single('poster'), movieController.updateMovie)

module.exports = router
