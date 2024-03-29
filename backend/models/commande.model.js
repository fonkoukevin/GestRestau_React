module.exports = (sequelize, Sequelize) => {
    const Commande = sequelize.define("commandes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contenu: {
        type: Sequelize.STRING,
        allowNull: false
      },
      boisson: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prix: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue : 1
    },
      
    });
  
    return Commande;
  };