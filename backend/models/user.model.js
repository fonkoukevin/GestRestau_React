const {APP_URL} = require("../config.js")

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        code: {
            type: Sequelize.STRING,
            allowNull : true,
            unique: true
        },

        name: {
            type: Sequelize.STRING
        },

        username: {
            type: Sequelize.STRING,
            unique: true
        },

        post: {
            type: Sequelize.ENUM("chef", "serveur", "caissier"),
            defaultValue : "serveur"
        },

        password: {
            type: Sequelize.STRING
        },

        photo: {

            type: Sequelize.STRING,
            allowNull : true,
            get() {
                const rawValue = this.getDataValue('photo');
                return rawValue ? APP_URL + "img/" + rawValue : APP_URL + "img/default/user/photo.png";
              }
        },
    },{
        
      });
      User.prototype.toJSON =  function () {
        var values = Object.assign({}, this.get());
      
        delete values.password;
        return values;
      }
    return User;
}