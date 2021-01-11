const app = require('./app')
var {portApplication} = require('../../IHNA_Utils/ihna_port')

app.listen(portApplication, () => {
  console.log(`App listening in ${portApplication}`)
})
