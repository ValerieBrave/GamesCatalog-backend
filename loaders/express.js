const bodyParser = require( "body-parser" )
const express = require( "express" )
const app_config = require("../config/app-config").app_config

class ExpressLoader {
    constructor() {
        const app = express()
        app.use(bodyParser.urlencoded({ extended: false }))
        this.server = app.listen(app_config.port, () => { console.log(`Server is listening on port ${app_config.port}`)})
    }
}

module.exports = ExpressLoader