const router = require("express").Router();
//importing the model
const { getAll, create, updateById, deleteById, getById } = require("./accounts-model");
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
  create(req.body)
    .then((newAccount) => {
      res.status(201).json(newAccount);
    })
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete("/:id", (req, res, next) => {
  // DO YOUR MAGIC
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
