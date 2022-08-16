const router = require("express").Router();
//importing the model
const { getAll, create, updateById, deleteById } = require("./accounts-model");
//importing middlewares
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const data = await getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkAccountId, (req, res) => {
  res.json(req.account);
});

router.post("/", checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  create(req.payload)
    .then((newAccount) => {
      res.status(201).json(newAccount);
    })
    .catch(next);
});

router.put("/:id", checkAccountId, checkAccountPayload, (req, res, next) => {
  updateById(req.params.id, req.body)
    .then((account) => {
      res.json(account);
    })
    .catch(next);
});

router.delete("/:id", checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  deleteById(req.params.id)
    .then((account) => {
      res.json(account);
    })
    .catch(next);
});

router.use(
  (
    err,
    req,
    res,
    next // eslint-disable-line
  ) => {
    // DO YOUR MAGIC
    res.status(err.status || 500).json({
      customMessage: "server error, try again never",
      message: err.message,
    });
  }
);

module.exports = router;
