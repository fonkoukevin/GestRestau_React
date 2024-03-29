const dbConfig = require("../db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host : dbConfig.HOST,
    dialect : dbConfig.dialect,
    opreratorsAliases : false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.menus = require("./menu.model")(sequelize, Sequelize)
db.users = require("./user.model")(sequelize, Sequelize)
db.employes = require("./employe.model")(sequelize, Sequelize)
db.tables = require("./table.model")(sequelize, Sequelize)
db.commandes = require("./commande.model")(sequelize, Sequelize)
db.menus.belongsTo(db.users)
db.users.hasMany(db.menus)
db.employes.hasMany(db.employes)
db.tables.hasMany(db.tables)
db.commandes.hasMany(db.commandes)

module.exports = db;
