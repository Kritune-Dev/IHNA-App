const packageInformation = require('../../package.json')
const utils = require('../utils')
require('dotenv').config()

const ihna_CalendarService = process.env.CALENDAR_SERVICE
const ihna_MessengerService = process.env.MESSENGER_SERVICE
const ihna_CalendarWorker = process.env.CALENDAR_WORKER

exports.getInformation = async (req, res, next) => {
  try {
    const packageJson = await utils.packageParseInformation(packageInformation)
    res.status(200).json(packageJson)
  } catch (error) {
    next(error)
  }
}

exports.getEtaService = async (req, res, next) => {
  try {
    const etaCalendarService = await utils.callService(ihna_CalendarService)
    const etaCalendarWorker = await utils.callService(ihna_CalendarWorker)
    const etaMessengerService = await utils.callService(ihna_MessengerService)
    const etaApp = await utils.packageParseInformation(packageInformation)
    const etaJson = await {IHNA_App: etaApp, IHNA_CalendarService: etaCalendarService, IHNA_CalendarWorker: etaCalendarWorker, IHNA_MessengerService: etaMessengerService}
    res.status(200).json(etaJson)
  } catch (error) {
    next(error)
  }
}