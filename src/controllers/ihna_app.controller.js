const packageInformation = require('../../package.json')
const utils = require('../utils')

const ihna_CalendarService = 'http://localhost:1901/api/CalendarService'
const ihna_CalendarWorker = 'http://localhost:1902/api/CalendarWorker'

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
    const etaApp = await utils.packageParseInformation(packageInformation)
    const etaJson = await {IHNA_App: etaApp, IHNA_CalendarService: etaCalendarService, IHNA_CalendarWorker: etaCalendarWorker}
    res.status(200).json(etaJson)
  } catch (error) {
    next(error)
  }
}