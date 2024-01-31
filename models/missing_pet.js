const { DataTypes } = require("sequelize");
const db = require("../db");

const MissingPet = db.Sequelize.define("MissingPet", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  colour: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lostDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  lastSeenLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // status:{
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   defaultValue: "missing",
  //   validate: {
  //     isIn: [["missing", "found"]],
  // }
  // }
  found: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  foundDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

module.exports = MissingPet;
