exports.app_config = 
{
    port: process.env.PORT || 3000
}

exports.db_config = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "mysql_root",
    database: "games_catalog",
    synchronize: true,
    entities: [
        require("../models/user")
    ]
}
