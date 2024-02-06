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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM,
    values: ["dog", "cat", "bird", "rabbit", "other"],
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
    allowNull: true,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["missing", "found"],
    allowNull: false,
    defaultValue: "missing",
  },
  // found: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: false,
  //   defaultValue: false,
  // },
  foundDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

module.exports = MissingPet;
