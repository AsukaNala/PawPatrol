const FoundPets = require("../models/foundPet");

//get all found pets data
const getFoundPets = async () => {
  const data = await FoundPets.findAll({});
  return data;
};

//get found pet by id
const getFoundPet = async (id) => {
  const data = await FoundPets.findOne({ where: { id: id } });
  return data;
};

//get found pet by userId
const getFoundPetByUserId = async (id) => {
  const data = await FoundPets.findAll({ where: { userId: id } });
  return data;
};

//get found pets by type
const getFoundPetsByType = async (type) => {
  const data = await FoundPets.findAll({ where: { type: type } });
  return data;
};

//get found pets by status
const getFoundPetsByStatus = async (status) => {
  const data = await FoundPets.findAll({ where: { status: status } });
  return data;
};

//get found pets by lastSeenLocation
const getFoundPetsByFoundLocation = async (foundLocation) => {
  const data = await FoundPets.findAll({
    where: { foundLocation: foundLocation },
  });
  return data;
};

//create found pet
const createFoundPet = async (data) => {
  const foundPet = await FoundPets.create(data);
  return foundPet;
};

const updateFoundPet = async (id, data) => {
  const foundPet = await FoundPets.update(data, { where: { id: id } });
  return foundPet;
};

const deleteFoundPet = async (id) => {
  const foundPet = await FoundPets.destroy({ where: { id: id } });
  return foundPet;
};

module.exports = {
  getFoundPets,
  getFoundPet,
  getFoundPetByUserId,
  getFoundPetsByType,
  getFoundPetsByStatus,
  getFoundPetsByFoundLocation,
  createFoundPet,
  updateFoundPet,
  deleteFoundPet,
};
