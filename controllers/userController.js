const User = require("../models/user");

/**
 *
 * @returns {PromiseArray<User>}
 */
const getUsers = async () => {
  const data = await User.findAll({});
  return data;
};

/**
 *
 * @param {number} id - user id
 * @returns {Promise<User>}
 */
const getUser = async (id) => {
  const data = await User.findOne({ where: { id: id } });
  return data;
};

/**
 *
 * @param {User} data - user data
 * @returns {Promise<User>}
 */
const createUser = async (user) => {
  const data = await User.create(user);
  return data;
};

/**
 *
 * @param {number} id - user id
 * @param {User} data - user data
 * @returns {Promise<User>}
 */
const updateUser = async (id, user) => {
  const data = await User.update(user, { where: { id: id } });
  return data;
};

/**
 *
 * @param {number} id - user id
 * @returns {Promise<User>}
 */
const deleteUser = async (id) => {
  const data = await User.destroy({ where: { id: id } });
  return data;
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
