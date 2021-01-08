const express = require('express')
const calendarController = require('../controllers/calendar_service.controller')
const router = express.Router()

router.get('/', calendarController.getInformation)

module.exports = router