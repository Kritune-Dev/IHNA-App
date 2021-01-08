const express = require('express')
const app = express()
const calendarRoutes = require('./routes/calendar_service.routes')

app.use(express.json())

app.use('/api/calendarservice', calendarRoutes)

app.use((error, req, res) => {
    res.status(500).json({message: error.message})
})

module.exports = app