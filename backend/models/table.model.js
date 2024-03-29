module.exports = (sequelize, Sequelize) => {
    const Table = sequelize.define("tables", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nombrePlaces: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      forme: {
        type: Sequelize.STRING,
        allowNull: false
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
    return Table;
  };