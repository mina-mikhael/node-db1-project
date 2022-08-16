const db = require("../../data/db-config");

const getAll = async () => {
  return await db("accounts");
};

const getById = async (id) => {
  return await db("accounts").where("id", id).first();
};

const create = async (account) => {
  const newID = await db("accounts").insert(account);
  return getById(newID);
};

const updateById = async (id, account) => {
  await db("accounts").where("id", id).update(account);
  return getById(id);
};

const deleteById = async (id) => {
  await db("accounts").where("id", id).delete();
  return getById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
