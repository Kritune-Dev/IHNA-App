const express = require('express')
const appController = require('../controllers/ihna_app.controller')
const router = express.Router()

router.get('/', appController.getInformation)

module.exports = router