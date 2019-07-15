const actorController = require('../controllers/actorController');
const express = require('express')
;

const router = express.Router();

router.get('/', actorController.getActors);

router.post('/', actorController.newActor);

router.put('/:name', actorController.updateActor);

module.exports = router;
