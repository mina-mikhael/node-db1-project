const db = require("../../data/db-config");

const getAll = async () => {
  return await db("accounts");
};

const getById = async (id) => {
  const data = await db("accounts").where("id", id).first();
  if (!data) {
    return null;
  } else return data;
};

const create = (account) => {
  // DO YOUR MAGIC
};

const updateById = (id, account) => {
  // DO YOUR MAGIC
};

const deleteById = (id) => {
  // DO YOUR MAGIC
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
