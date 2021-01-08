const Controller = require('../../src/controllers/ihna_app.controller')
const Utils = require("../../src/utils")
const httpMocks = require('node-mocks-http')
const packageInformation = require('../../package.json')
const etaService = require('../mock/etaService')

Utils.packageParseInformation = jest.fn()
Utils.callService = jest.fn()

let req, res, next

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe('IHNA_App unit test', () => {
  describe('Get information', () => {
    it('Should have a getInformation function', () => {
      expect(typeof Controller.getInformation).toBe('function')
    })

    it('Should call packageParseInformation()', () => {
      Controller.getInformation(req, res, next)

      expect(Utils.packageParseInformation).toBeCalledWith(packageInformation)
    })

    it('Should return 200 response code', async () => {
      await Controller.getInformation(req, res, next)

      expect(res.statusCode).toBe(200)
      expect(res._isEndCalled()).toBeTruthy()
    })

    it('Should return name and version in response', async () => {
      Utils.packageParseInformation.mockReturnValue({name: "ihna_app", version: "1.0.0"})

      await Controller.getInformation(req, res, next)

      expect(res._getJSONData()).toStrictEqual({name: "ihna_app", version: "1.0.0"})
    })

    it('Should handle errors', async () => {
      const errorMessage = {message: "Error finding"}
      const rejectedPromise = Promise.reject(errorMessage)
      Utils.packageParseInformation.mockReturnValue(rejectedPromise)

      await Controller.getInformation(req, res, next)

      expect(next).toBeCalledWith(errorMessage)
    })
  })

  describe('Get information betwenn different services', () => {
    it('Should have a getEtaService function', () => {
      expect(typeof Controller.getEtaService).toBe('function')
    })

    it('Should call callService() and packageParseInformation()', () => {
      Controller.getEtaService(req, res, next)

      expect(Utils.packageParseInformation).toBeCalledWith(packageInformation)
      expect(Utils.callService).toBeCalledWith(expect.anything())
    })

    it('Should return 200 response code', async () => {
      await Controller.getEtaService(req, res, next)

      expect(res.statusCode).toBe(200)
    })

    it('Should return name and version in response', async () => {
      Utils.packageParseInformation.mockReturnValue(etaService)

      await Controller.getInformation(req, res, next)

      expect(res._getJSONData()).toStrictEqual(etaService)
    })
  })
})