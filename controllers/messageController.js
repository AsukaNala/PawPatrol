const Message = require("../models/message");

//get all messages
const getAllMessages = async () => {
  const data = await Message.findAll({});
  return data;
};

//get message by id
const getMessage = async (id) => {
  const data = await Message.findOne({ where: { id: id } });
  return data;
};

//get message by userId
const getMessageByUserId = async (id) => {
  const data = await Message.findAll({ where: { userId: id } });
  return data;
};

//get message by missingPetId
const getMessageByMissingPetId = async (id) => {
  const data = await Message.findAll({ where: { missingPetId: id } });
  return data;
};

//create message
const createMessage = async (data) => {
  const message = await Message.create(data);
  return message;
};

//update message by id
const updateMessage = async (id, data) => {
  const message = await Message.update(data, { where: { id: id } });
  return message;
};

//delete message by id
const deleteMessage = async (id) => {
  const message = await Message.destroy({ where: { id: id } });
  return message;
};

module.exports = {
  getAllMessages,
  getMessage,
  getMessageByUserId,
  getMessageByMissingPetId,
  createMessage,
  updateMessage,
  deleteMessage,
};
