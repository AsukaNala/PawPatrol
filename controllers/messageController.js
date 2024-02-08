const Message = require("../models/message");

const getMessages = async () => {
  const data = await Message.findAll({});
  return data;
};
