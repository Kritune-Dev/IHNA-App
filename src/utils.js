const axios = require('axios')

exports.packageParseInformation= (packageJson) => {
    return {name: packageJson.name, version: packageJson.version}
}

exports.callService = (urlService) => {
    return new Promise((resolve, reject) => {
        axios.get(urlService)
        .then(response => {
            resolve({name: response.data.name, version: response.data.version, working: true})
        })
        .catch(error => {
            reject(error)
        })
    })
}