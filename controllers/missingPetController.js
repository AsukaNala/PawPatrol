const MissingPets = require("../models/missing_pet");

const getMissingPets = async () => {
  const data = await MissingPets.findAll({});
  return data;
};

const getMissingPet = async (id) => {
  const data = await MissingPets.findOne({ where: { id: id } });
  return data;
};

const createMissingPet = async (data) => {
  const missingPet = await MissingPets.create(data);
  return missingPet;
};

const updateMissingPet = async (id, data) => {
  const missingPet = await MissingPets.update(data, { where: { id: id } });
  return missingPet;
};

const deleteMissingPet = async (id) => {
  const missingPet = await MissingPets.destroy({ where: { id: id } });
  return missingPet;
};

module.exports = {
  getMissingPets,
  getMissingPet,
  createMissingPet,
  updateMissingPet,
  deleteMissingPet,
};

//want to add get missing pets "type","color","last_seen_location"
