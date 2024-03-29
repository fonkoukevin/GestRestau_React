
module.exports = (sequelize, Sequelize) => {

    const Employe = sequelize.define("employes", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          nom: {
            type: Sequelize.STRING,
            allowNull: false
          },
          surnom: {
            type: Sequelize.STRING,
            allowNull: true
          },
          poste: {
            type: Sequelize.STRING,
            allowNull: true
          },
          telephone: {
            type: Sequelize.STRING,
            allowNull: true
          },
          isAvailable: {
            type: Sequelize.BOOLEAN,
            defaultValue : 1
        },

    });
    return Employe;
}


