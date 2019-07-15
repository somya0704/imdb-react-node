import { upload } from '../config/posterMulter';

const movieController = require('../controllers/movieController');
const express = require('express')
;

const router = express.Router();

router.get('/', movieController.getMovies);

router.post('/', upload.single('poster'), movieController.newMovie);

router.put('/:id', upload.single('poster'), movieController.updateMovie);

module.exports = router;
