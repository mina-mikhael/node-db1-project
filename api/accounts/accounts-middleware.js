const Accounts = require("./accounts-model");

const checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body;
  if (name === undefined || budget === undefined) {
    res.status(400).json({
      message: "name and budget are required",
    });
  } else if (name.trim().length > 100 || name.trim().length < 3) {
    res.status(400).json({
      message: "name of account must be between 3 and 100",
    });
    // eslint-disable-next-line use-isnan
  } else if (isNaN(budget) || typeof budget !== "number") {
    res.status(400).json({
      message: "budget of account must be a number",
    });
  } else if (parseInt(budget) < 0 || parseInt(budget) > 1000000) {
    res.status(400).json({
      message: "budget of account is too large or too small",
    });
  } else {
    req.payload = {
      name: name.trim(),
      budget: parseInt(budget),
    };
    next();
  }
};

const checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const { name } = req.body;
  Accounts.getAll().then((data) => {
    if (data.find((account) => account.name === name)) {
      res.status(400).json({
        message: "that name is taken",
      });
      return;
    }
    next();
  });
};

const checkAccountId = (req, res, next) => {
  Accounts.getById(req.params.id)
    .then((account) => {
      if (!account) {
        res.status(404).json({
          message: "account not found",
        });
      } else {
        req.account = account;
        next();
      }
    })
    .catch((err) => {
      res.status(err.status || 500).json({
        error: `problem finding account with id: ${req.params.id}`,
        message: err.message,
      });
    });
};

module.exports = { checkAccountPayload, checkAccountNameUnique, checkAccountId };

// db('foo-table') // returns a promise that resolves to an **array** with all records in the table
// db('foo-table').where({ role: 'Student', active: true }) // resolves to an **array** of all records that satisfy the where
// db('foo-table').where('name', 'Mary') // is an alternative for when there is just one where condition
// db('foo-table').where('id', 7).first() // will resolve to the **record** we want (if the id is unique for a table) or undefined
// db('foo-table').insert({ bar: 'baz' }) // resolves to an **array** containing the **ids of the records** inserted into the table
// db('foo-table').where('id', id).update({ bar: 'new bar' }) // resolves to the **number of records** affected by the update
// db('foo-table').where('id', id).delete() // resolves to the **number of records** affected by the delete
