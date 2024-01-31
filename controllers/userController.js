const User = require("../models/user");
const getUsers = async () => {
  const data = await User.findAll({});
  return data;
};
const createUser = async (user) => {
  const data = await User.create(user);
  return data;
};

module.exports = { getUsers, createUser };
