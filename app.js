const db_config = require("./config/app-config").db_config
const ExpressLoader = require( "./loaders/express" )
const typeorm = require("typeorm")


const connectionManager = typeorm.getConnectionManager()
const connection = connectionManager.create(db_config)

connection.connect().then(
    new ExpressLoader()
)
.catch(err => {
    console.log(err)
})
