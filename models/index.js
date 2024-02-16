"use strict";
const Users = require("./user");
const MissingPets = require("./missingPet");

const FoundPets = require("./foundPet");
const Messages = require("./message");
async function init() {
  // create relationships between models
  Users.hasMany(MissingPets, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
  });
  MissingPets.belongsTo(Users, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
  });

  Users.hasMany(FoundPets, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
  });
  FoundPets.belongsTo(Users, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
  });
  Users.hasMany(Messages, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
  });
  Messages.belongsTo(Users, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
  });
  MissingPets.hasMany(Messages, {
    foreignKey: {
      name: "missingPetId",
      allowNull: false,
    },
  });
  Messages.belongsTo(MissingPets, {
    foreignKey: {
      name: "missingPetId",
      allowNull: false,
    },
  });

  // sync all models with database
  await Users.sync();
  await MissingPets.sync();
  await FoundPets.sync();
  await Messages.sync();
}
module.exports = {
  init,
};
