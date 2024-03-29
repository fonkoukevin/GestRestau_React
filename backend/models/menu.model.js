

module.exports = (sequelize, Sequelize) => {

    const Menu = sequelize.define("menus", {
        code: {
            type: Sequelize.STRING,
            allowNull : true,
            unique: true
        },

        name: {
            type: Sequelize.STRING
        },

        price: {
            type: Sequelize.INTEGER
        },

        type: {
            type: Sequelize.ENUM("plat", "boisson"),
            defaultValue : "plat"
        },

        duration: {
            type: Sequelize.INTEGER
        },

        photo: {
            type: Sequelize.STRING,
            allowNull : true
        },
        description: {
            type: Sequelize.STRING
        },

        isAvailable: {
            type: Sequelize.BOOLEAN,
            defaultValue : 1
        },

    });

    return Menu;
}