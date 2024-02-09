const { DataTypes } = require("sequelize");
const db = require("../db");

const FoundPet = db.Sequelize.define("FoundPet", {
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
    type: DataTypes.ENUM,
    values: ["dog", "cat", "bird", "rabbit", "other"],
    allowNull: false,
  },
  colour: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foundDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  foundLocation: {
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
    values: ["unclaimed", "claimed"],
    allowNull: false,
    defaultValue: "unclaimed",
  },
  // claimed: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: false,
  //   defaultValue: false,
  // },
  claimedDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

module.exports = FoundPet;
