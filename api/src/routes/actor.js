let actorModel = require("../models/actorModel")
let actorController = require("../controllers/actorController")
let express = require('express')
let router = express.Router()

router.get('/', actorController.getActors)

router.post('/', actorController.newActor)

router.put('/:name', actorController.updateActor)

module.exports = router
