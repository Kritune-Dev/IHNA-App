const express = require('express')
const app = express()
const ihnaAppRoutes = require('./routes/ihna_app.routes')

app.use(express.json())

app.use('/api/App', ihnaAppRoutes)

app.use((error, req, res) => {
  res.status(500).json({message: error.message})
})

module.exports = app