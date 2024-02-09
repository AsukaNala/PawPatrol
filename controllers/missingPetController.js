const MissingPets = require("../models/missingPet");
const multer = require("multer");
const path = require("path");

//set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/missingPets");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// upload photos
const uploadPhoto = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Error: Images only!");
  },
}).array("photos", 3);

//get all missing pets data
const getMissingPets = async () => {
  const data = await MissingPets.findAll({});
  return data;
};

//get missing pet by id
const getMissingPet = async (id) => {
  const data = await MissingPets.findOne({ where: { id: id } });
  return data;
};

//get missing pet by userId
const getMissingPetByUserId = async (userId) => {
  const data = await MissingPets.findAll({ where: { userId: userId } });
  return data;
};

//get missing pet by type
const getMissingPetsByType = async (type) => {
  const data = await MissingPets.findAll({ where: { type: type } });
  return data;
};

//get missing pet by status
const getMissingPetsByStatus = async (status) => {
  const data = await MissingPets.findAll({ where: { status: status } });
  return data;
};

//get missing pet by lastSeenLocation
const getMissingPetsByLastSeenLocation = async (lastSeenLocation) => {
  const data = await MissingPets.findAll({
    where: { lastSeenLocation: lastSeenLocation },
  });
  return data;
};

//create missing pet
const createMissingPet = async (data) => {
  const missingPet = await MissingPets.create(data);
  return missingPet;
};

//update missing pet by id
const updateMissingPet = async (id, data) => {
  const missingPet = await MissingPets.update(data, { where: { id: id } });
  return missingPet;
};

//delete missing pet by id
const deleteMissingPet = async (id) => {
  const missingPet = await MissingPets.destroy({ where: { id: id } });
  return missingPet;
};

module.exports = {
  getMissingPets,
  getMissingPet,
  getMissingPetByUserId,
  getMissingPetsByType,
  getMissingPetsByStatus,
  getMissingPetsByLastSeenLocation,
  createMissingPet,
  updateMissingPet,
  deleteMissingPet,
  uploadPhoto,
};
