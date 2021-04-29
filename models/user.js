const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns : {
        id: { primary: true, type:'int', generated: true },
        name: { type:'varchar', nullable: false },
        email: { type: 'varchar', unique: true },
        avatar: { type: 'varchar' },
        birthday: { type: 'date', nullable: false },
        password: { type: 'varchar', nullable: false },
        role: { type: 'varchar', nullable: false }
    }
})